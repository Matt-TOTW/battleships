import BattlefieldCompononet  from './Battlefield'
import { IGameComponentProps } from '../types/types'
import FireForm from './forms/FireForm'

const Game = (props: IGameComponentProps) => {
    return (
        <div>
            <h1>BATTLESHIPS</h1>
            <button onClick={props.startAgain}>New game</button>
            <hr /><br />
            <FireForm onFire={props.onFire} />
            <p id="message">{props.message ? props.message : 'Enter coordinate (eg B7) or click on the grid'}</p>
            {props.arena.size > 0 && <BattlefieldCompononet arena={props.arena} onFire={props.onFire} />}
        </div>
    )
}

export default Game