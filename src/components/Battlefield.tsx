import { Fragment } from 'react'
import { NumberToAlphabet } from 'number-to-alphabet'
import * as types from '../types/types'
import Zone from './Zone'
const alphabet = new NumberToAlphabet()

const Battlefield = (props: types.IBattlefieldComponentProps) => {
    const unitSize = '50px'
    const gridTemplateArray = []
    for (let i = 0; i < Math.sqrt(props.arena.size); i++) {
        gridTemplateArray.push(unitSize)
    }
    const divStyle = {
        display: 'grid',
        gridTemplateColumns: `${gridTemplateArray.join(' ')}`,
        gridTemplateRows: `${gridTemplateArray.join(' ')}`,
        gridAutoFlow: 'column',
        gap: '5px'
    }

    const renderArena = () => {
        const grid = []
        for (let zone of props.arena) {
            grid.push({
                name: zone[0],
                info: zone[1]
            })
        }
        return grid.map(zone => {
            return <Zone key={zone.name} zone={zone} clickZone={props.onFire} />
        })
    }

    const renderColumnHeader = () => {
        const arr = []
        for (let i = 0; i < Math.sqrt(props.arena.size); i++) {
            arr.push(i+1)
        }
        return arr.map(elem => {
            return (
                <div key={elem}>{alphabet.numberToString(elem).toUpperCase()}</div>
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
                <div key={elem}>{elem}</div>
            )
        })
    }

    return (
        <Fragment>
            <div
                style={{
                    marginLeft: '35px',
                    display: 'grid',
                    gridTemplateColumns: `${gridTemplateArray.join(' ')}`,
                    gap: '5px'
                }}
            >
                {renderColumnHeader()}
            </div>
            <div style={{display: 'flex'}}>
                <div
                    style={{
                        marginTop: '15px',
                        display: 'grid',
                        gridTemplateRows: `${gridTemplateArray.join(' ')}`,
                        gap: '5px'
                    }}
                >
                    {renderRowHeader()}
                </div>
                <div style={divStyle}>
                    {renderArena()}
                </div>
            </div>
        </Fragment>
    )
}

export default Battlefield