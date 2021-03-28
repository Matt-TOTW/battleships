import { IShotsComponentProps } from '../types/types'
import {
    Box,
    Theme,
    makeStyles
} from '@material-ui/core'

const styles = makeStyles<Theme>(theme => {
    return {
        outerCircleStyles: {
            height: `${theme.grid.boxSize*0.65}px`,
            width: `${theme.grid.boxSize*0.65}px`,
            borderRadius: `${(theme.grid.boxSize*0.65)/2}px`
        },
        middleCircleStyles:{
            height: `${theme.grid.boxSize*0.5}px`,
            width: `${theme.grid.boxSize*0.5}px`,
            borderRadius: `${(theme.grid.boxSize*0.5)/2}px`
        },
        innerCircleStyles: {
            height: `${theme.grid.boxSize*0.2}px`,
            width: `${theme.grid.boxSize*0.2}px`,
            borderRadius: `${(theme.grid.boxSize*0.2)/2}px`
        },
        shotMissStyles: {
            backgroundColor: theme.palette.text.primary
        },
        shotHitStyles: {
            backgroundColor: theme.palette.primary.main
        },
        shotBackgroundStyles: {
            backgroundColor: theme.palette.background.default
        },
        baseStyles: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
})

const Shot = (props: IShotsComponentProps) => {
    const classes = styles()

    return (
        <Box className={`${classes.baseStyles} ${classes.outerCircleStyles} ${props.hit ? classes.shotHitStyles : classes.shotMissStyles}`}>
            <Box className={`${classes.baseStyles} ${classes.middleCircleStyles} ${classes.shotBackgroundStyles}`}>
                <Box className={`${classes.baseStyles} ${classes.innerCircleStyles} ${props.hit ? classes.shotHitStyles : classes.shotMissStyles}`} />
            </Box>
        </Box>
    )
}

export default Shot