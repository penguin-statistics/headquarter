import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { CONFIG_API_BASE_URL } from 'config'
import { RootState } from 'store'

export const baseQuery = fetchBaseQuery({
  baseUrl: CONFIG_API_BASE_URL,
  prepareHeaders(headers, api) {
    const state = api.getState() as RootState
    if (state.auth.token) {
      headers.set('Authorization', `Bearer ${state.auth.token}`)
    }
    return headers
  },
})
