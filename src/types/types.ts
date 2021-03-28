
import Boat from '../classes/Boat'
import React from 'react'

export interface IArenaValues {
    occupied?: Boat
    tried: boolean
}

export type TArena = Map<string, IArenaValues>
export type TOnFire = (aim: string) => void
export type TBoatTypes = 'destroyer' | 'battleship' | 'frigate'

export interface IShip {
    type: TBoatTypes,
    size: number
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

export interface IShotsComponentProps {
    hit: boolean
}

export enum shotResponse {
    gameOver = 'gameOver',
    notFound = 'notFound',
    alreadyTried = 'alreadyTried',
    miss = 'miss',
    hit = 'hit',
    sunk = 'sunk',
    sunkAndGameOver = 'sunkAndGameOver'
}

export interface IShotResponse {
    type: shotResponse
    boatType?: string
}