import { configureStore } from '@reduxjs/toolkit'

import { adminApi } from './services/admin/api'
import { authApi } from './services/auth/api'
import { graphApi } from './services/courses-graph/api'
import { accountsApi } from './services/txs/accounts/api'
import { txsApi } from './services/txs/api'

import base from './slices/base'
import user from './slices/user'

const store = configureStore({
    reducer: {
        base,
        user,

        [txsApi.reducerPath]: txsApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [accountsApi.reducerPath]: accountsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [graphApi.reducerPath]: graphApi.reducer,
    },
    middleware: (gDM) => gDM().concat([
        txsApi.middleware,
        adminApi.middleware,
        accountsApi.middleware,
        authApi.middleware,
        graphApi.middleware,
    ]),
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
