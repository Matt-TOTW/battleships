 import * as types from '../types/types'
import Boat from './Boat'

class Battlefield {
    private arena: Map<string, types.IArenaValues>
    private boats: Boat[]
    readonly size: number
    private gameOver: boolean

    constructor(size: number) {
        this.arena = new Map()
        this.boats = []
        this.size = size
        this.gameOver = false

        this.buildArena()
    }

    get grid() {
        const grid = []
        for (let zone of this.arena.keys()) {
            grid.push(zone)
        }
        return grid
    }
    get getNumberOfBoats() {
        return this.boats.length
    }
    get getArena() {
        return this.arena
    }
    get getGameOver() {
        return this.gameOver
    }

    set setBoat(boat: Boat) {
        const combinedBoatPlacements = [...boat.placement]
        this.boats.forEach(elem => elem.placement.forEach(coordinate => combinedBoatPlacements.push(coordinate)))
        const totalSize = combinedBoatPlacements.length
        const set = new Set(combinedBoatPlacements)
        if (totalSize === set.size) {
            boat.placement.forEach(coordinate => this.arena.set(coordinate, {occupied: boat, tried: false}))
            this.boats.push(boat)
        }
    }

    private buildArena = () => {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.arena.set(`${i},${j}`, {tried: false})
            }
        }
    }

    fire = (aim: string) => {
        const zone = this.arena.get(aim)
        let result: types.IShotResponse
        if (this.gameOver) return result = { type: types.shotResponse.gameOver }
        if (!zone) return result = { type: types.shotResponse.notFound }
        if (zone.tried) return result = { type: types.shotResponse.alreadyTried }
        if (!zone.occupied) {
            this.arena.set(aim, {tried: true})
            return result = { type: types.shotResponse.miss }
        } else {
            const boat = zone.occupied
            boat.hit = aim
            this.arena.set(aim, {occupied: boat, tried: true})
            let gameOn = false
            for (let i = 0; i < this.boats.length; i++) {
                if (!this.boats[i].getSunk) {
                    gameOn = true
                    break
                }
            }
            this.gameOver = !gameOn
            if (this.gameOver) return result = { type: types.shotResponse.sunkAndGameOver, boatType: boat.type }
            if (boat.getSunk) return result = { type: types.shotResponse.sunk, boatType: boat.type }
            return result = { type: types.shotResponse.hit }
        }
    }

}

export default Battlefield