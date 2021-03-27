import React from 'react'
import * as types from '../types/types'

const Zone = (props: types.IZoneComponentProps) => {
    const zone = props.zone

    const onHandleClick = (e: React.MouseEvent) => {
        props.onFire(zone.name)
    }

    return (
        <div
            onClick={onHandleClick}
            style={{border: 'solid black 1px', cursor: 'pointer'}}
        >
            {zone.info.tried && <p style={{textAlign: 'center'}}>{zone.info.occupied ? <span style={{color: 'red'}}>HIT!</span> : 'Miss'}</p>}
        </div>
    )
}

export default Zone