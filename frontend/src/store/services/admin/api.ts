
import { createApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { apiEndPoints, BASE_API_URL, SERVICES } from '../../../libs/const-path'

import { secureQueryWithReauth } from '../auth/api'
import { secureQueryBuilder } from '../_api'
import { TUser } from '../../../types/types'


const secureQuery = secureQueryBuilder(`${BASE_API_URL}${SERVICES.auth_port}`)

export const adminApi = createApi({
    baseQuery: secureQueryWithReauth(secureQuery),
    reducerPath: 'adminApi',
    tagTypes: ['Admin'],
    endpoints:
        (build:
            EndpointBuilder<BaseQueryFn<string | FetchArgs, {}, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
                'Admin', 'adminApi'>,
        ) => ({
            listUsers: build.query<TUser[], null>({
                query() {
                    return {
                        url: apiEndPoints.LIST_USERS,
                        method: 'GET',
                    }
                },
                transformResponse: (response: TUser[]) => response,
                providesTags: ['Admin'],
            }),
            listWithdraw: build.query<any, any>({
                query() {
                    return {
                        url: apiEndPoints.LIST_WITHDRAW,
                        method: 'GET',
                    }
                },
                providesTags: ['Admin'],
            }),
            approveWithdraw: build.mutation<any, any>({
                query(body) {
                    return {
                        url: apiEndPoints.APPROVE_WITHDRAW,
                        method: 'POST',
                        body,
                    }
                },
                invalidatesTags: ['Admin'],
            }),
            approveUser: build.mutation<any, any>({
                query(body) {
                    return {
                        url: apiEndPoints.APPROVE_USER,
                        method: 'POST',
                        body,
                    }
                },
                invalidatesTags: ['Admin'],
            }),
            banUser: build.mutation<any, any>({
                query(body) {
                    return {
                        url: apiEndPoints.BAN_USER,
                        method: 'POST',
                        body,
                    }
                },
                invalidatesTags: ['Admin'],
            }),
        }),
})

export const {
    useListUsersQuery,
    useListWithdrawQuery,
    useApproveWithdrawMutation,
    useApproveUserMutation,
    useBanUserMutation,
} = adminApi
