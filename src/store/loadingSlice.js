import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
}

// this is a combination of actions and reducers
export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true
        },
        notLoading: (state) => {
            state.loading = false
        },
    },
})

export const {loading, notLoading} = loadingSlice.actions;
export default loadingSlice.reducer;