import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

export interface AuthState {
  authed: boolean
  token: string | null
}

const initialState = { token: null, authed: false } as AuthState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tokenChanged(state, action: PayloadAction<AuthState['token']>) {
      state.token = action.payload
    },
    loggedIn(state) {
      state.authed = true
    },
    loggedOut(state) {
      state.token = null
      state.authed = false
    },
  },
})

export const selectToken = (state: RootState) => state.auth.token
export const selectIsLoggedIn = (state: RootState) => state.auth.authed

export const {
  tokenChanged: authTokenChanged,
  loggedOut: authLoggedOut,
  loggedIn: authLoggedIn,
} = authSlice.actions
authSlice.actions
export default authSlice.reducer
