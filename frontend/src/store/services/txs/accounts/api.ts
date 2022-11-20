import { createApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { apiEndPoints, BASE_API_URL, SERVICES } from '../../../../libs/const-path'

import { secureQueryBuilder } from '../../_api'
import { TAccount } from '../../../../types/types'

const secureQuery = secureQueryBuilder(`${BASE_API_URL}${SERVICES.txs_port}`)

export const accountsApi = createApi({
    baseQuery: secureQuery,
    reducerPath: 'accountsApi',
    tagTypes: ['Accounts'],
    endpoints:
        (build:
            EndpointBuilder<BaseQueryFn<string | FetchArgs, {}, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
                'Accounts', 'accountsApi'>,
        ) => ({
            userAccounts: build.query<TAccount[], any>({
                query() {
                    return {
                        url: apiEndPoints.USER_ACCOUNTS,
                        method: 'GET',
                    }
                },
                providesTags: ['Accounts'],
                transformResponse: (response: { content: TAccount[][] }) => response.content[0],
            }),
            invoice: build.query<any, any>({
                query() {
                    return {
                        url: apiEndPoints.INVOICE,
                        method: 'GET',
                    }
                },
                transformResponse: (response: { content: any }) => response.content,
            }),
            approveInvoice: build.query<any, any>({
                query() {
                    return {
                        url: apiEndPoints.APPROVE_INVOICE,
                        method: 'GET',
                    }
                },
                transformResponse: (response: { content: any }) => response.content,
            }),
            newAccount: build.mutation<any, any>({
                query(body) {
                    return {
                        url: apiEndPoints.NEW_ACCOUNT,
                        method: 'POST',
                        body,
                    }
                },
                invalidatesTags: ['Accounts'],
            }),
            transfer: build.mutation<any, any>({
                query(body) {
                    return {
                        url: apiEndPoints.TRANSFER,
                        method: 'POST',
                        body,
                    }
                },
            }),
        }),
})

export const {
    useUserAccountsQuery,
    useInvoiceQuery,
    useApproveInvoiceQuery,
    useNewAccountMutation,
    useTransferMutation,
} = accountsApi
