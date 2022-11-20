import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { roles } from '../../libs/consts'
import { authApi } from '../services/auth/api'

import { RootState } from './../store'

import { TMe } from './../../types/types'

interface IInitialState {
    access_token: string | null
    refresh_token: string | null
    token_type: string
    role: string
    virified: false
}

const initialState: IInitialState = {
    access_token: null,
    refresh_token: null,
    token_type: 'Bearer',
    role: 'user',
    virified: false,
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ access_token: string, refresh_token: string }>) => {
            state.access_token = action.payload?.access_token || state.access_token
            state.refresh_token = action.payload?.refresh_token || state.refresh_token
        },
        setRole: (state, action: PayloadAction<TMe>) => {
            state.role = action.payload.is_admin ? roles.ADMIN : roles.USER
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            authApi.endpoints.logout.matchFulfilled,
            (state, { payload }) => {
                state.access_token = null
                state.refresh_token = null
                state.role = 'user'
                localStorage.removeItem('user')
                state.virified = false
                console.log('log out user')
            },
        )
    },
})

const { actions, reducer } = user

export const slctUser = (state: RootState) => state.user
export default reducer

export const {
    setUser,
    setRole,
} = actions
