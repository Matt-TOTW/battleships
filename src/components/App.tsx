import React, { useState, useEffect } from 'react'
import * as types from '../types/types'
import { startNewGame, shotResponder } from '../utils/utils'
import Battlefield from '../classes/Battlefield'
import Game from './Game'
import LandingPage from './LandingPage'
import { Container } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme/base'

const arenaSize = 10
const ships: types.IShip[] = [
    {type: 'destroyer', size: 4},
    {type: 'battleship', size: 5},
    {type: 'destroyer', size: 4},
    // {type: 'frigate', size: 2}
]
if (arenaSize > 26 || arenaSize < 5) throw new Error('The arena size must at least 5 and no bigger than 26')

let battlefield: Battlefield

const App = () => {
    const [gameStarted, setGameStarted] = useState(false)
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
        const response: types.IShotResponse = battlefield.fire(aim)
        setArena(new Map(battlefield.getArena))
        setMessage(shotResponder[types.shotResponse[response.type]](response.boatType))
    }

    const startAgain = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setMessage('')
        newGame()
    }

    const start = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setGameStarted(true)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                {gameStarted ?
                    <Game
                        startAgain={startAgain}
                        onFire={onFire}
                        message={message}
                        arena={arena}
                    />
                :
                    <LandingPage
                        gameStarted={gameStarted}
                        start={start}
                    />
                }
            </Container>
        </ThemeProvider>
    )
}

export default App