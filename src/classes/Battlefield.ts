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
        if (this.gameOver) return `The game is over`
        if (!zone) return `Couldn't find that square, please make sure you enter in the format A1.`
        if (zone.tried) return `You've already tried there`
        if (!zone.occupied) {
            this.arena.set(aim, {tried: true})
            return `That's a miss`
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
            if (this.gameOver) return `That's a hit! You've sunk a ${boat.type} and that's all of 'em. You win!`
            if (boat.getSunk) return `That's a hit! You've sunk a ${boat.type}.`
            return `That's a hit!`
        }
    }

}

export default Battlefield