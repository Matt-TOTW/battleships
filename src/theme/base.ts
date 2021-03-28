import { createMuiTheme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        grid: {
            boxSize: number,
            spacing: number
        }
    }
    interface ThemeOptions {
        grid: {
            boxSize: number,
            spacing: number
        }
    }
}

const theme = createMuiTheme({
    typography: {
        h2: {
            fontSize: '3rem',
            marginTop: '2rem',
            marginBottom: '1rem'
        },
        body2: {
            marginTop: '1rem',
            fontSize: '1.5rem'
        }
    },
    palette: {
        background: {
            default: '#000000'
        },
        text: {
            primary: '#ffffff'
        },
        primary: {
            main: '#B01218',
            dark: '#962d31'
        },
        secondary: {
            main: '#12b0a3',
            dark: '#2d968d'
        }
    },
    grid: {
        boxSize: 49,
        spacing: 10
    }
})

export default theme