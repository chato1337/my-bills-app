import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../models/User'

export interface AuthState {
    user: User | null,
    token: string | null
}

const initialState: AuthState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        resetUser: (state) => {
            state.user = null
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        resetToken: (state) => {
            state.token = null
        }
    }
})

export const { setUser, resetUser, setToken, resetToken } = authSlice.actions

export default authSlice.reducer