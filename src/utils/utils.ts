import * as types from '../types/types'
import Battlefield from '../classes/Battlefield'
import Boat from '../classes/Boat'

const stringToNumber: any = { A: '0', B: '1', C: '2', D: '3', E: '4', F: '5', G: '6', H: '7', I: '8', J: '9', K: '10', L: '11', M: '12', N: '13', O: '14', P: '15', Q: '16', R: '17', S: '18', T: '19', U: '20', V: '21', W: '22', X: '23', Y: '24', Z: '25'}
const numberToString: any = { 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'}

const shotResponder: {
    [name in types.shotResponse]: Function
} = {
    gameOver() { return `The game is over.` },
    notFound() { return `Couldn't find that square, please make sure you enter in the format A1.` },
    alreadyTried() { return `You've already tried there.` },
    miss() { return `That's a miss.` },
    hit() { return `That's a hit!` },
    sunk(boatType: string) { return `That's a hit! You've sunk a ${boatType}.` },
    sunkAndGameOver(boatType: string) { return `That's a hit! You've sunk a ${boatType} and that's all of 'em. You win!` }
}

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
            const placement = randomPlacement(newBattlefield.grid, ship.size)
            const boat = new Boat(placement, ship.type)
            newBattlefield.setBoat = boat
        })
        if (newBattlefield.getNumberOfBoats === ships.length) {
            return newBattlefield
        }
    }
}

export {
    randomPlacement,
    startNewGame,
    stringToNumber,
    numberToString,
    shotResponder
}