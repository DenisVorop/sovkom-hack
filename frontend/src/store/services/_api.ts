import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { Cookies } from 'typescript-cookie'

import { RootState } from '../store'

export const secureQueryBuilder = (baseUrl: string) =>
	fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers: Headers, { getState }) => {
			let access_token = (getState() as RootState).user.access_token
			if (!access_token && !!Cookies.get('saveMe')) {
				if (Cookies.get('user') !== null) {
					try {
						const res = JSON.parse('' + Cookies.get('user') || '{}')
						access_token = res?.access_token
					} catch (e: any) {
						console.log(new Error(e))
					}
				}
			}
			if (access_token && !headers.get('authorization')) {
				headers.set('authorization', `Bearer ${access_token}`)
			}
			return headers
		},
	})
