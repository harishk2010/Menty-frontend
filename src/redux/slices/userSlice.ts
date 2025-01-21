'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
    userId: string | null,
    name: string | null,
    email: string | null,
    role: string | null
}

// Initialize state
const initialState: User = {
    userId: null,
    name: null,
    email: null,
    role: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            const { userId, name, email, role } = action.payload;
            state.userId = userId,
                state.name = name,
                state.email = email,
                state.role = role

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(state));
            }
        },

        clearUserDetials: (state) => {
            state.userId = null
            state.name = null
            state.email = null
            state.role = null

            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
        }
    }
})

export const { setUser, clearUserDetials } = userSlice.actions
export default userSlice.reducer