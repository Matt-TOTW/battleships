import { Fragment } from 'react'
import * as types from '../types/types'
import { numberToString } from '../utils/utils'
import Zone from './Zone'
import {
    Box,
    Theme,
    makeStyles
} from '@material-ui/core'

interface StylesProps {
    arena: types.TArena
}
const styles = makeStyles<Theme, StylesProps>(theme => {
    return {
        gridStyle: props => ({
            display: "flex",
            width: `${Math.sqrt(props.arena.size)*(theme.grid.boxSize + theme.grid.spacing)}px`,
            height: `${Math.sqrt(props.arena.size)*(theme.grid.boxSize + theme.grid.spacing)}px`,
            flexDirection: "column",
            flexWrap: "wrap"
        }),
        gridItemStyle: {
            width: theme.grid.boxSize,
            height: theme.grid.boxSize,
            display: 'flex',
            marginRight: theme.grid.spacing,
            marginBottom: theme.grid.spacing,
            justifyContent: 'center',
            alignItems: 'center'
        },
        gridColumnHeaderStyle: props => ({
            display: "flex",
            width: `${Math.sqrt(props.arena.size)*(theme.grid.boxSize + theme.grid.spacing)}px`,
            height: `${theme.grid.boxSize}px`,
            marginLeft: `${theme.grid.boxSize}px`
        }),
        gridRowHeaderStyle: props => ({
            display: "flex",
            flexDirection: "column",
            width: `${theme.grid.boxSize}px`,
            height: `${Math.sqrt(props.arena.size)*(theme.grid.boxSize + theme.grid.spacing)}px`
        })
    }    
})

const Battlefield = (props: types.IBattlefieldComponentProps) => {
    const classes = styles(props)

    const renderArena = () => {
        const grid = []
        for (let zone of props.arena) {
            grid.push({
                name: zone[0],
                info: zone[1]
            })
        }
        return grid.map(zone => {
            return (
                <Box key={zone.name} className={classes.gridItemStyle}>
                    <Zone key={zone.name} zone={zone} onFire={props.onFire} />
                </Box>
            )
        })
    }

    const renderColumnHeader = () => {
        const arr = []
        for (let i = 0; i < Math.sqrt(props.arena.size); i++) {
            arr.push(i)
        }
        return arr.map(elem => {
            return (
                <Box key={elem} className={classes.gridItemStyle}>
                    {/* {alphabet.numberToString(elem).toUpperCase()} */}
                    {numberToString[elem]}
                </Box>
            )
        })
    }
    const renderRowHeader = () => {
        const arr = []
        for (let i = 0; i < Math.sqrt(props.arena.size); i++) {
            arr.push((i+1).toString())
        }
        return arr.map(elem => {
            return (
                <Box key={elem} className={classes.gridItemStyle}>
                    {elem}
                </Box>
            )
        })
    }

    return (
        <Fragment>
            <Box className={classes.gridColumnHeaderStyle}>
                {renderColumnHeader()}
            </Box>
            <Box display="flex">
                <Box className={classes.gridRowHeaderStyle}>
                    {renderRowHeader()}
                </Box>
                <Box className={classes.gridStyle}>
                    {renderArena()}
                </Box>
            </Box>
        </Fragment>
    )
}

export default Battlefield