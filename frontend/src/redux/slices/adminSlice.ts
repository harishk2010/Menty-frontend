'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface Admin {
    adminId: string | null,
    name: string | null,
    email: string | null,
    role: string | null,
    
}
// Initialize state
const initialState: Admin = {
    adminId: null,
    name: null,
    email: null,
    role: null,
    
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action: PayloadAction<Admin>) => {
            const { adminId, name, email, role } = action.payload;
            state.adminId = adminId,
                state.name = name,
                state.email = email,
                state.role = role
              

            if (typeof window !== 'undefined') {
                localStorage.setItem('admin', JSON.stringify(state));
            }
        },

        clearAdminDetials: (state) => {
            state.adminId = null
            state.name = null
            state.email = null
            state.role = null
            

            if (typeof window !== 'undefined') {
                localStorage.removeItem('admin');
            }
        }
    }
})

export const { setAdmin, clearAdminDetials } = adminSlice.actions
export default adminSlice.reducer