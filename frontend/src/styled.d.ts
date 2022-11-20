import 'styled-components'

interface IColor {
    white: string
    orange: string
    blue: string
    gray: string
    blue_gray: string
    bg: string
    text: string
    yellow: string
}

interface IBgTheme {
    default: string
    muted: string
    action: string
    action2: string
    subtle?: string
}

interface IColorsTheme {
    bg: IBgTheme
    border: {
        default: string
    }
    fg: {
        default: string
    }
    additional: {
        gray: string
    }
}

declare module 'styled-components' {
    export interface DefaultTheme {
        color: IColor
        colors: IColorsTheme
    }
}
