import React from 'react'
import { DefaultTheme } from 'styled-components'

import { setTheme } from '../store/slices/base'
import { ThemeLight, ThemeDark } from '../styles/theme'
import { themeStyle } from '../libs/consts'

import { useToggle } from './use-toggle'
import { useAppDispatch, useAppSelector } from './redux'
import { useLocalStorage } from './use-local-storage'


interface ITheme {
    bool: boolean
    theme: DefaultTheme
    style: string
}

export const useTheme = (): { theme: DefaultTheme, bool: boolean, toggle: () => void } => {
    const theme = useAppSelector(state => state.base.theme)
    const dispatch = useAppDispatch()
    const [value, setValue] = useLocalStorage<ITheme>('theme', { bool: false, theme: ThemeLight, style: 'light' })
    const [bool, toggle] = useToggle(value.bool)

    React.useEffect(() => {
        document.body.style.background = theme.colors.bg.default
        document.body.style.color = theme.colors.fg.default
    }, [theme])

    React.useEffect(() => {
        if (!bool) {
            dispatch(setTheme(ThemeLight))
            setValue({ bool, theme: ThemeLight, style: themeStyle.LIGHT })
        }
        if (bool) {
            dispatch(setTheme(ThemeDark))
            setValue({ bool, theme: ThemeDark, style: themeStyle.DARK })
        }
    }, [bool])

    return { theme,bool, toggle }
}
