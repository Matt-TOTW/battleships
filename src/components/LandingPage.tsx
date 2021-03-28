import {
    Typography,
    Button,
    Grid,
    Theme,
    makeStyles
} from '@material-ui/core'

interface LandingPageProps {
    gameStarted: boolean
    start(e: React.FormEvent<HTMLButtonElement>): void
}

const styles = makeStyles<Theme>(theme => {
    return {
        button: {
            height: '6rem',
            width: '6rem',
            borderRadius: '3rem'
        },
        grid: {
            height: '100vh'
        }
    }
})

const LandingPage = (props: LandingPageProps) => {
    const classes = styles()

    return (
        <Grid
            container
            direction="column"
            alignItems={'center'}
            justify={'center'}
            classes={{
                root: classes.grid
            }}
        >
            <Typography variant="h1">
                Battleships
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={props.start}
                classes={{
                    root: classes.button
                }}
            >START</Button>
        </Grid>
    )
}

export default LandingPage