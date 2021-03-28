import React from 'react'
import { mount } from 'enzyme'
import * as utils from '../utils/utils'
import Battlefield from '../classes/Battlefield'
import Boat from '../classes/Boat'
import App from '../components/App'

test('check functionality of randomPlacement()', () => {
    const testGrid = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            testGrid.push(`${i},${j}`)
        }
    }
    const placement = utils.randomPlacement(testGrid, 5)

    // Assert returned placement to have 5 coordinates, all of which should be on the grid
    expect (placement.length).toEqual(5)
    placement.forEach(coordinate => {
        const column = parseInt(coordinate.split(',')[0])
        const row = parseInt(coordinate.split(',')[1])
        expect(column).toBeLessThan(10)
        expect(column).toBeGreaterThanOrEqual(0)
        expect(row).toBeLessThan(10)
        expect(row).toBeGreaterThanOrEqual(0)
    })

    // Assert coordinates are next to each other
    const firstCoord = placement[0].split(',')
    const secondCoord = placement[1].split(',')
    const x1 = parseInt(firstCoord[0]), x2 = parseInt(secondCoord[0])
    const y1 = parseInt(firstCoord[1]), y2 = parseInt(secondCoord[1])
    let direction

    expect(x1 === x2 && y1 === y2).toBe(false)
    if (x1 === x2) direction = 'down'
    if (y1 === y2) direction = 'right'
    expect(direction).toBeTruthy()

    for (let i = 1; i < placement.length; i++) {
        const x = parseInt(placement[i].split(',')[0])
        const y = parseInt(placement[i].split(',')[1])
        if (direction === 'down') {
            expect(x).toEqual(x1) // the x's shouldn't change
            expect(y).toEqual(y1+i) // the y's should increase by i 
        } else {
            expect(x).toEqual(x1+i) // the x's should increase by i
            expect(y).toEqual(y1) // the y's shouldn't change
        }
    }
})

test('Build battlefield bit by bit', () => {
    const battlefield = new Battlefield(10)

    // Assert setBoat adds boat to battlefield and arena has been updated
    const boat = new Boat(["0,0", "0,1", "0,2", "0,3"])
    battlefield.setBoat = boat
    expect(battlefield.getNumberOfBoats).toEqual(1)
    expect(battlefield.getArena.get("0,0").occupied instanceof Boat).toBe(true)
    expect(battlefield.getArena.get("0,1").occupied instanceof Boat).toBe(true)
    expect(battlefield.getArena.get("0,2").occupied instanceof Boat).toBe(true)
    expect(battlefield.getArena.get("0,3").occupied instanceof Boat).toBe(true)

    // Assert cannot set second boat with a matching coordinate (and that arena was not updated)
    const boat2 = new Boat(["0,0", "1,0", "2,0", "3,0"])
    battlefield.setBoat = boat2
    expect(battlefield.getNumberOfBoats).toEqual(1)
    expect(battlefield.getArena.get("0,0").occupied instanceof Boat).toBe(true)
    expect(battlefield.getArena.get("1,0").occupied).toBeFalsy()
    expect(battlefield.getArena.get("2,0").occupied).toBeFalsy()
    expect(battlefield.getArena.get("3,0").occupied).toBeFalsy()
})

test('startNewGame() should return Battlefield. Check setBoats', () => {
    const battlefield = utils.startNewGame(10, [{type: 'destroyer', size: 4}, {type: 'battleship', size: 5}])
    expect(battlefield instanceof Battlefield).toBe(true)
    expect(battlefield.getNumberOfBoats).toEqual(2)
})

test('test fire', () => {
    const battlefield = new Battlefield(10)
    const boat = new Boat(["0,0", "0,1", "0,2", "0,3"])
    battlefield.setBoat = boat
    
    battlefield.fire("9,9")
    // Assert arena("9,9") to have tried: true
    expect(battlefield.getArena.get("9,9").tried).toBe(true)

    battlefield.fire("0,0")
    // Assert arena has updated and boat has been hit
    expect(battlefield.getArena.get("0,0").tried).toBe(true)
    expect(boat.getHits.length).toEqual(1)
    expect(boat.getHits[0]).toBe("0,0")

    battlefield.fire("0,1")
    battlefield.fire("0,2")
    battlefield.fire("0,3")
    // Assert boat has sunk and game is over
    expect(boat.getSunk).toBe(true)
    expect(battlefield.getGameOver).toBe(true)
})

test('mount the app and test firing via input', () => {
    const app = mount(<App gameStarted={true} />)
    app.find('input').simulate('change', { target: { value: 'A1' } })
    app.find('form').simulate('submit')
    const message = app.find('#message').text()
    console.log('message', message)
    expect(message === 'That\'s a miss.' || message === 'That\'s a hit!').toBe(true)
})