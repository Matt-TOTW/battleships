import * as types from '../types/types'
import Battlefield from '../classes/Battlefield'
import Boat from '../classes/Boat'

const randomPlacement = (grid: string[], boatSize: number) => {
    // Start with a random coordinate
    // Choose a random direction, cartesian coordinates so right or down will suffice
    // Ensure not to start too close to the right/bottom edge
    // Try until succesful
    // Ways to improve:
    // - test for immpossibilty
    // - improve strategy for/when low chance of success
    while(true) {
        let placement = []
        const gridSize = Math.sqrt(grid.length)
        const randomStart = `${Math.floor(Math.random() * gridSize)},${Math.floor(Math.random() * gridSize)}`
        const col = parseInt(randomStart.split(',')[0])
        const row = parseInt(randomStart.split(',')[1])
        const direction = Math.round(Math.random()) ? 'right' : 'down' // Flip a coin
        if (direction === 'right' && col <= gridSize - boatSize) {
            for (let i = 0; i < boatSize; i++) {
                placement.push(`${col + i},${row}`)
            }
            return placement
        }
        if (direction === 'down' && row <= gridSize - boatSize) {
            for (let i = 0; i < boatSize; i++) {
                placement.push(`${col},${row + i}`)
            }
            return placement
        }
    }
}

const startNewGame = (size: number, ships: types.IShip[]) => {
    while (true) {
        const newBattlefield = new Battlefield(size)
        ships.forEach(ship => {
            const placement = randomPlacement(newBattlefield.grid, ship.type === 'destroyer' ? 4 : 5)
            const boat = new Boat(placement)
            newBattlefield.setBoat = boat
        })
        if (newBattlefield.getNumberOfBoats === ships.length) {
            return newBattlefield
        }
    }
}

export {
    randomPlacement,
    startNewGame
}