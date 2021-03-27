import React, { useState } from 'react'
import { NumberToAlphabet } from 'number-to-alphabet'
import * as types from '../../types/types'

const alphabet = new NumberToAlphabet()

const FireForm = (props: types.IFireForm) => {
    const [aim, setAim] = useState('')

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const charRegex = /([A-Z])+/ig
        const numRegex = /([0-9])+/g
        const chars = aim.match(charRegex)!.join()
        const nums = numRegex.test(aim) ? aim.match(numRegex)!.join() : ''
        const zoneName = `${alphabet.stringToNumber(chars.toLowerCase())-1},${parseInt(nums)-1}`

        props.onFire(zoneName)
        setAim('')
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                onChange={e => setAim(e.target.value)}
                value={aim}
            />
            <button>FIRE!</button>
        </form>
    )
}

export default FireForm