import React, { useState, useEffect } from 'react'
import * as types from '../types/types'
import { startNewGame } from '../utils/utils'
import Battlefield from '../classes/Battlefield'
import Game from './Game'

const arenaSize = 10
const ships: types.IShip[] = [
    {type: 'destroyer'},
    {type: 'battleship'},
    {type: 'destroyer'}
]

let battlefield: Battlefield

const App = () => {
    const [arena, setArena] = useState(new Map())
    const [message, setMessage] = useState('')
    useEffect(() => {
        newGame()
    }, [])

    const newGame = () => {
        battlefield = startNewGame(arenaSize, ships)
        setArena(new Map(battlefield.getArena))
    }

    const onFire: types.TOnFire = (aim: string) => {
        const attemptMessage = battlefield.fire(aim)
        setArena(new Map(battlefield.getArena))
        setMessage(attemptMessage)
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
            message={message}
            arena={arena}
        />
    )
}

export default App