import React, { useState, useEffect } from 'react'
import { NumberToAlphabet } from 'number-to-alphabet'
import * as types from '../types/types'
import { startNewGame } from '../utils/utils'
import Battlefield from '../classes/Battlefield'
import BattlefieldCompononet from './Battlefield'

const alphabet = new NumberToAlphabet()

const arenaSize = 10
const ships: types.IShip[] = [
    {type: 'destroyer'},
    {type: 'battleship'},
    {type: 'destroyer'}
]

let battlefield: Battlefield

const App = () => {
    const [arena, setArena] = useState(new Map())
    const [aim, setAim] = useState('')
    const [message, setMessage] = useState('')
    useEffect(() => {
        newGame()
    }, [])

    const newGame = () => {
        battlefield = startNewGame(arenaSize, ships)
        setArena(new Map(battlefield.getArena))
    }

    const onFire = (e: React.FormEvent<HTMLFormElement>, zoneName = aim) => {
        e.preventDefault()

        message && setMessage('')

        const charRegex = /([A-Z])+/ig
        const numRegex = /([0-9])+/g
        if (aim) { // Then this was a text input, otherwise it was a click on the grid
            const chars = zoneName.match(charRegex)!.join()
            const nums = numRegex.test(zoneName) ? zoneName.match(numRegex)!.join() : ''
            zoneName = `${alphabet.stringToNumber(chars.toLowerCase())-1},${parseInt(nums)-1}`
        }

        const attemptMessage = battlefield.fire(zoneName)
        setArena(new Map(battlefield.getArena))
        setMessage(attemptMessage)
        aim && setAim('')
    }

    const startAgain = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setMessage('')
        newGame()
    }

    return (
        <div>
            <h1>BATTLESHIPS</h1>
            <button onClick={startAgain}>New game</button>
            <hr /><br />
            <form onSubmit={onFire}>
                <input
                    type="text"
                    onChange={e => setAim(e.target.value)}
                    value={aim}
                    onFocus={e => setMessage(battlefield.getGameOver ? 'The game is over' : '')}
                />
                <button>FIRE!</button>
            </form>
            <p id="message">{message ? message : 'Enter coordinate (eg B7) or click on the grid'}</p>
            {arena.size > 0 && <BattlefieldCompononet arena={arena} onFire={onFire} />}
        </div>
    )
}

export default App