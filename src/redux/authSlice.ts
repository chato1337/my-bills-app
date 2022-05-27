import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../models/User'

export interface AuthState {
    user: User | null
}

const initialState: AuthState = {
    user: null
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
        } 
    }
})

export const { setUser, resetUser } = authSlice.actions

export default authSlice.reducer