import { createApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { apiEndPoints, BASE_API_URL, SERVICES } from '../../../libs/const-path'

import { TTransaction } from '../../../types/types'

import { secureQueryBuilder } from './../_api'

export interface INewDealRequest {
    id_account: number
    ticket_from: string
    ticket_to: string
    action: string
    instrument: string
    amount: number
    client_open_value: number
    client_close_value: number
    status: string
}

const secureQuery = secureQueryBuilder(`${BASE_API_URL}${SERVICES.txs_port}`)

export const txsApi = createApi({
    baseQuery: secureQuery,
    reducerPath: 'txsApi',
    tagTypes: ['Txs'],
    endpoints:
        (build:
            EndpointBuilder<BaseQueryFn<string | FetchArgs, {}, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
                'Txs', 'txsApi'>,
        ) => ({
            userTransactionsAll: build.query<TTransaction[], any>({
                query() {
                    return {
                        url: apiEndPoints.USER_TRANSACTIONS,
                        method: 'GET',
                    }
                },
                transformResponse: (response: { content: TTransaction[][] }) => response.content[0],
            }),
            userTransactionsAccount: build.query<TTransaction[], { id_account: number }>({
                query(body) {
                    return {
                        url: apiEndPoints.ACCOUNT_TRANSACTIONS,
                        method: 'POST',
                        body,
                    }
                },
                providesTags: ['Txs'],
                transformResponse: (response: { content: TTransaction[] }) => response.content,
            }),
            newTransaction: build.mutation<any, any>({
                query(body) {
                    return {
                        url: apiEndPoints.NEW_TRANSACTION,
                        method: 'POST',
                        body,
                    }
                },
                invalidatesTags: ['Txs'],
            }),
        }),
})

export const {
    useUserTransactionsAllQuery,
    useNewTransactionMutation,
    useUserTransactionsAccountQuery,
} = txsApi
