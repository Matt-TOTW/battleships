import React from 'react'
import BattlefieldCompononet  from './Battlefield'
import Battlefield from '../classes/Battlefield'
import * as types from '../types/types'

const Game = (props: {
    startAgain(e: React.FormEvent<HTMLButtonElement>): void
    onFire(e: React.FormEvent<HTMLFormElement>): void
    setAim(aim: string): void
    aim: string
    setMessage(message: string): void
    battlefield: Battlefield
    message: string
    arena: Map<string, types.IArenaValues>
}) => {
    return (
        <div>
            <h1>BATTLESHIPS</h1>
            <button onClick={props.startAgain}>New game</button>
            <hr /><br />
            <form onSubmit={props.onFire}>
                <input
                    type="text"
                    onChange={e => props.setAim(e.target.value)}
                    value={props.aim}
                    onFocus={e => props.setMessage(props.battlefield.getGameOver ? 'The game is over' : '')}
                />
                <button>FIRE!</button>
            </form>
            <p id="message">{props.message ? props.message : 'Enter coordinate (eg B7) or click on the grid'}</p>
            {props.arena.size > 0 && <BattlefieldCompononet arena={props.arena} onFire={props.onFire} />}
        </div>
    )
}

export default Game