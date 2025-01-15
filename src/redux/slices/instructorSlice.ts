'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface instructor {
    userId: string,
    name: string,
    email: string,
    role: string
}

// Initialize state
const initialState: instructor = {
    userId: '',
    name: '',
    email: '',
    role: ''
};

const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<instructor>) => {
            console.log('Previous State:', state); // Log previous state
            console.log('Action Payload:', action.payload); // Log action payload
            const { userId, name, email, role } = action.payload;
            state.userId = userId,
                state.name = name,
                state.email = email,
                state.role = role
                
            console.log('Updated State:', state); // Log updated state
            
            if (typeof window !== 'undefined') {
                localStorage.setItem('instructor', JSON.stringify(state));
            }
        },

        clearUserDetials: (state) => {
            state.userId = ''
            state.name = ''
            state.email = ''
            state.role = ''

            if (typeof window !== 'undefined') {
                localStorage.removeItem('instructor');
            }
        }
    }
})

export const { setUser, clearUserDetials } = instructorSlice.actions
export default instructorSlice.reducer