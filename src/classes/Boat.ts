import { TBoatTypes } from '../types/types'

class Boat {
    public placement: string[]
    readonly size: number
    readonly type: TBoatTypes
    private hits: string[]
    private sunk: boolean

    constructor(placement: string[], type: TBoatTypes) {
        this.placement = placement
        this.size = placement.length
        this.type = type
        this.hits = []
        this.sunk = false
    }
    
    get getHits() {
        return [...this.hits]
    }
    get getSunk() {
        return this.sunk
    }

    set hit(aim: string) {
        this.hits.push(aim)
        if (this.hits.length === this.size) {
            this.sunk = true
        }
    }
}

export default Boat