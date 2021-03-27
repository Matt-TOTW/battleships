import React, { useState, useEffect } from 'react'
import { NumberToAlphabet } from 'number-to-alphabet'
import * as types from '../types/types'
import { startNewGame } from '../utils/utils'
import Battlefield from '../classes/Battlefield'
import BattlefieldCompononet from './Battlefield'
import Game from './Game'

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

    const onFire = (e: React.FormEvent<HTMLFormElement>, zone?: string) => {
        e.preventDefault()
        
        let zoneName = zone || aim

        message && setMessage('')

        if (aim) { // Then this was a text input, otherwise it was a click on the grid
            const charRegex = /([A-Z])+/ig
            const numRegex = /([0-9])+/g
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
        <Game
            startAgain={startAgain}
            onFire={onFire}
            setAim={setAim}
            aim={aim}
            setMessage={setMessage}
            battlefield={battlefield}
            message={message}
            arena={arena}
        />
    )
}

export default App