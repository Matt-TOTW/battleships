import * as types from '../types/types'

const Zone = (props: types.IZoneComponentProps) => {
    const zone = props.zone

    return (
        <div
            onClick={e => props.clickZone(e, zone.name)}
            style={{border: 'solid black 1px', cursor: 'pointer'}}
        >
            {zone.info.tried && <p style={{textAlign: 'center'}}>{zone.info.occupied ? <span style={{color: 'red'}}>HIT!</span> : 'Miss'}</p>}
        </div>
    )
}

export default Zone