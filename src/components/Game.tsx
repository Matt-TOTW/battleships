import { Fragment } from 'react'
import BattlefieldCompononet  from './Battlefield'
import { IGameComponentProps } from '../types/types'
import FireForm from './forms/FireForm'
import {
    Typography,
    Button,
    Theme,
    makeStyles
} from '@material-ui/core'

const styles = makeStyles<Theme>(theme => {
    return {
        button: {
            marginBottom: '1rem'
        }
    }
})

const Game = (props: IGameComponentProps) => {
    const classes = styles()

    return (
        <Fragment>
            <Typography variant="h2">
                BATTLESHIPS
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={props.startAgain}
                disableElevation
                classes={{
                    root: classes.button
                }}
            >
                New game
            </Button>
            <hr /><br />
            <FireForm onFire={props.onFire} />
            <Typography variant="body2" id="message">
                {props.message ? props.message : 'Enter coordinate or click on the grid'}
            </Typography>
            {props.arena.size > 0 && <BattlefieldCompononet arena={props.arena} onFire={props.onFire} />}
        </Fragment>
    )
}

export default Game