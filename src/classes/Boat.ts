class Boat {
    public placement: string[]
    readonly size: number
    readonly type: 'destroyer' | 'battleship'
    private hits: string[]
    private sunk: boolean

    constructor(placement: string[]) {
        this.placement = placement
        this.size = placement.length
        this.type = placement.length === 4 ? 'destroyer' : 'battleship'
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