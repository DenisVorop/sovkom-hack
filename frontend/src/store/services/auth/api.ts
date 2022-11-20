import { Cookies } from 'typescript-cookie'
import { createApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Mutex } from 'async-mutex'

import { apiEndPoints, BASE_API_URL, SERVICES } from '../../../libs/const-path'

import { secureQueryBuilder } from '../_api'

import { setUser } from '../../slices/user'
import { TMe } from '../../../types/types'

const mutex = new Mutex()

const secureQuery = secureQueryBuilder(`${BASE_API_URL}${SERVICES.auth_port}`)

export const secureQueryWithReauth =
    (secureBase) => async (args, api, extraOptions) => {
        await mutex.waitForUnlock()
        let result = await secureBase(args, api, extraOptions)
        const userObj = Cookies.get('user') ? JSON.parse('' + Cookies.get('user') || '{}') : null
        if (result.meta.response.status === 401 && !!userObj.refresh_token) {
            if (!mutex.isLocked()) {
                const release = await mutex.acquire()
                try {
                    let refreshResult = null as any
                    const refresh_token = userObj.refresh_token
                    if (!!refresh_token) {
                        refreshResult = await secureBase(
                            {
                                url: apiEndPoints.REFRESH_DATA,
                                method: 'POST',
                                headers: {
                                    authorization: `Bearer ${refresh_token}`,
                                },
                            },
                            api,
                            extraOptions,
                        )
                    }
                    if (refreshResult) {
                        Cookies.set('user', JSON.stringify(refreshResult))
                        api.dispatch(setUser(refreshResult.data))
                        result = await secureBase(args, api, extraOptions)
                    } else {
                        if (!!userObj?.access_token) {
                            api.dispatch(authApi.endpoints.logout.initiate(null))
                            Cookies.remove('user')
                        }
                    }
                } finally {
                    release()
                }
            } else {
                await mutex.waitForUnlock()
                result = await secureBase(args, api, extraOptions)
            }
        }
        return result
    }


export const authApi = createApi({
    baseQuery: secureQueryWithReauth(secureQuery),
    reducerPath: 'authApi',
    tagTypes: ['Auth'],
    endpoints:
        (build:
            EndpointBuilder<BaseQueryFn<string | FetchArgs, {}, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
                'Auth', 'authApi'>,
        ) => ({
            approveEmail: build.query<any, any>({
                query() {
                    return {
                        url: `${apiEndPoints.APPROVE_EMAIL}?key=`,
                        method: 'GET',
                    }
                },
                transformResponse: (response: { content: any }) => response.content,
            }),
            restorePassword: build.query<any, any>({
                query() {
                    return {
                        url: `${apiEndPoints.RESTORE_PASSWORD}?key=`,
                        method: 'GET',
                    }
                },
                transformResponse: (response: { content: any }) => response.content,
            }),
            register: build.mutation<any, any>({ // request +
                query(body) {
                    return {
                        url: apiEndPoints.REGISTER,
                        method: 'POST',
                        body,
                    }
                },
            }),
            login: build.mutation<any, any>({ // request -
                query(body) {
                    return {
                        url: apiEndPoints.LOGIN,
                        method: 'POST',
                        body,
                    }
                },
                transformResponse: (result) => {
                    Cookies.set('user', JSON.stringify(result))
                    return result
                },
            }),
            me: build.query<TMe, null>({
                query() {
                    return {
                        url: apiEndPoints.ME,
                        method: 'GET',
                    }
                },
            }),
            logout: build.mutation<any, null>({
                query() {
                    return {
                        url: apiEndPoints.LOGOUT,
                        method: 'GET',
                    }
                },
            }),
            changePassword: build.mutation<any, any>({
                query(body) {
                    return {
                        url: `${apiEndPoints.CHANGE_PASSWORD}?key=`,
                        method: 'POST',
                        body,
                    }
                },
            }),
            forgotPassword: build.mutation<any, any>({
                query(body) {
                    return {
                        url: apiEndPoints.FORGOT_PASSWORD,
                        method: 'POST',
                        body,
                    }
                },
            }),
        }),
})

export const {
    useApproveEmailQuery,
    useRestorePasswordQuery,
    useRegisterMutation,
    useLoginMutation,
    useMeQuery,
    useLogoutMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
} = authApi
