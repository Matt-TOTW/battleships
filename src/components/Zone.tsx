import React from 'react'
import { IZoneComponentProps } from '../types/types'
import Shot from './Shot'
import {
    Grid,
    Theme,
    makeStyles,
} from '@material-ui/core'

const styles = makeStyles<Theme>(theme => {
    return {
        boxStyle: {
            border: `solid ${theme.palette.text.primary} 1px`,
            height: '100%',
            cursor: 'pointer'
        }
    }
})

const Zone = (props: IZoneComponentProps) => {
    const classes = styles()
    const zone = props.zone

    const onHandleClick = (e: React.MouseEvent) => {
        props.onFire(zone.name)
    }

    return (
        <Grid container
            onClick={onHandleClick}
            className={classes.boxStyle}
            justify={'center'}
            alignItems={'center'}
        >
            {zone.info.tried && <Shot hit={!!zone.info.occupied} />}
        </Grid>
    )
}

export default Zone