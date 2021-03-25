import Boat from '../classes/Boat'
import React from 'react'

export interface IArenaValues {
    occupied?: Boat
    tried: boolean
}

export interface IShip {
    type: 'destroyer' | 'battleship'
}

export interface IBattlefieldComponentProps {
    arena: Map<string, IArenaValues>
    onFire: any
}

export interface IZoneComponentProps {
    zone: {
        name: string
        info: {
            occupied?: Boat
            tried: boolean
        }
    }
    clickZone(e: React.MouseEvent, name: string): void
}