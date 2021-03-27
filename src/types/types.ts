
import Battlefield from '../classes/Battlefield'
import Boat from '../classes/Boat'
import React from 'react'

export interface IArenaValues {
    occupied?: Boat
    tried: boolean
}

export type TArena = Map<string, IArenaValues>
export type TOnFire = (aim: string) => void

export interface IShip {
    type: 'destroyer' | 'battleship'
}

export interface IGameComponentProps {
    startAgain(e: React.FormEvent<HTMLButtonElement>): void
    onFire: TOnFire
    message: string
    arena: TArena
}

export interface IFireForm {
    onFire: TOnFire
}

export interface IBattlefieldComponentProps {
    arena: TArena
    onFire: TOnFire
}

export interface IZoneComponentProps {
    zone: {
        name: string
        info: IArenaValues
    }
    onFire: TOnFire
}