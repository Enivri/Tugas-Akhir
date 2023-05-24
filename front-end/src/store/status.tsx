import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StatusState = {
    loading?: boolean
    errorMessage?: string
    isSidebarOpen: boolean
}

const defaultState: StatusState = {
    loading: false,
    errorMessage: "",
    isSidebarOpen: false,
}

const statusSlice = createSlice({
    name: 'status',
    initialState: defaultState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
            localStorage.setItem("statusState", JSON.stringify(state))
        },

        setError: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.errorMessage = action.payload
            localStorage.setItem("statusState", JSON.stringify(state))
        },

        setIsSidebarOpen: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
            localStorage.setItem("statusState", JSON.stringify(state))
        }

    }, 
})



export const statusActions = statusSlice.actions
export default statusSlice
