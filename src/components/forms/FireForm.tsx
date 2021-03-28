import React, { useState } from 'react'
import * as types from '../../types/types'
import { stringToNumber } from '../../utils/utils'
import {
    FormHelperText,
    TextField,
    Button,
    Grid,
    Theme,
    createStyles,
    WithStyles,
    withStyles
} from '@material-ui/core'

const styles = (theme: Theme) => createStyles({
    outlinedInput: {
        borderColor: theme.palette.text.primary
    },
    helperText: {
        color: theme.palette.text.primary
    },
    helperTextError: {
        color: theme.palette.primary.main
    }
})

interface IFireForm extends WithStyles<typeof styles> {
    onFire: types.TOnFire
}

const FireForm = withStyles(styles)(({classes, ...props}: IFireForm) => {
    const [aim, setAim] = useState('')
    const [error, setError] = useState(false)

    const handleOnFocus = () => {
        setError(false)
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const aim = e.target.value.toUpperCase()

        if (aim.length <= 3) {
            setAim(aim)
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const charRegex = /([A-Z])+/ig
        const numRegex = /([0-9])+/g
        if (
            !charRegex.test(aim) ||
            !numRegex.test(aim) ||
            aim.match(charRegex)!.length > 1 ||
            aim.match(numRegex)!.length > 1 ||
            aim.match(charRegex)![0].split('').length > 1
            ) {
            setAim('')
            setError(true)
            return
        }
        const chars = aim.match(charRegex)![0].split('')[0].toUpperCase() // Will always be one letter A-Z
        const nums = aim.match(numRegex)!.join()
        const zoneName = `${stringToNumber[chars]},${parseInt(nums)-1}`

        props.onFire(zoneName)
        setAim('')
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={1} item xs={2} alignItems={'center'}>
                <Grid item xs={4}>
                    <TextField
                        error={error}
                        variant="outlined"
                        fullWidth
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        value={aim}
                        size={'small'}
                        placeholder={'D5'}
                        color={'primary'}
                        InputProps={{
                            classes: {
                                notchedOutline: classes.outlinedInput
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        fullWidth
                        color="primary"
                    >FIRE!</Button>
                </Grid>
            </Grid>
            <FormHelperText
                classes={{
                    root: error ? classes.helperTextError : classes.helperText
                }}
            >
                Enter in the form 'D5'
            </FormHelperText>
        </form>
    )
})

export default FireForm