'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface instructor {
    userId: string | null,
    name: string | null,
    email: string | null,
    role: string | null,
    profilePicUrl: string | null
}

// Initialize state
const initialState: instructor = {
    userId: null,
    name: null,
    email: null,
    role: null,
    profilePicUrl:null
};

const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<instructor>) => {
             const { userId, name, email, role ,profilePicUrl} = action.payload;
            state.userId = userId,
                state.name = name,
                state.email = email,
                state.role = role
                state.profilePicUrl=profilePicUrl

            if (typeof window !== 'undefined') {
                localStorage.setItem('instructor', JSON.stringify(state));
            }
        },

        clearUserDetials: (state) => {
            state.userId = null
            state.name = null
            state.email = null
            state.role = null
            state.profilePicUrl=null

            if (typeof window !== 'undefined') {
                localStorage.removeItem('instructor');
            }
        }
    }
})

export const { setUser, clearUserDetials } = instructorSlice.actions
export default instructorSlice.reducer