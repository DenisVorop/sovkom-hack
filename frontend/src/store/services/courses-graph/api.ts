import { createApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { apiEndPoints, BASE_API_URL, SERVICES } from '../../../libs/const-path'

import { secureQueryBuilder } from './../_api'

const secureQuery = secureQueryBuilder(`${BASE_API_URL}${SERVICES.graph_port}`)

export const graphApi = createApi({
    baseQuery: secureQuery,
    reducerPath: 'graphApi',
    tagTypes: ['Graph'],
    endpoints:
        (build:
            EndpointBuilder<BaseQueryFn<string | FetchArgs, {}, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
                'Graph', 'graphApi'>,
        ) => ({
            graphYahoo: build.query<any, any>({
                query(body) {
                    return {
                        url: apiEndPoints.GRAPH_YAHOO,
                        method: 'POST',
                        body,
                    }
                },
                transformResponse: (result: any) => result?.chart?.result?.[0],
            }),
            codesCentrobank: build.query<any, any>({
                query(body) {
                    return {
                        url: apiEndPoints.CODES_CENTROBANK,
                        method: 'GET',
                        body,
                    }
                },
            }),
            liveCourses: build.query<any, any>({
                query() {
                    return {
                        url: apiEndPoints.LIVE_COURSES,
                        method: 'GET',
                    }
                },
            }),
        }),
})

export const {
    useGraphYahooQuery,
    useCodesCentrobankQuery,
    useLiveCoursesQuery,
} = graphApi
