import { DefaultTheme } from 'styled-components'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthorizationStatus } from '../../libs/consts'

import { ThemeLight } from './../../styles/theme'

interface baseInitialState {
    authorizationStatus: string
    theme: DefaultTheme
}

const fn = () => {
    const theme = localStorage.getItem('theme')
    return theme ? JSON.parse(theme).theme : ThemeLight
}

const initialState: baseInitialState = {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    theme: fn(),
}

export const base = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setAuthorizationStatus: (state, action) => {
            state.authorizationStatus = action.payload
        },
        setTheme: (state, action: PayloadAction<DefaultTheme>) => {
            state.theme = action.payload
        },
    },
    extraReducers: (builder) => {
    },
})

export const {
    setAuthorizationStatus,
    setTheme,
} = base.actions

export default base.reducer
