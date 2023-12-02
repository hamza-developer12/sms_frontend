import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const refreshApi = createAsyncThunk('refreshApi', async (data, thunkApi) => {
    try {
        const response = await axios.get(`${baseUrl}/api/refresh`, {withCredentials: true})
    } catch (e) {
        return thunkApi.rejectWithValue(e.response.data.msg)
    }
})

const initialState = {
    loading: false,
    data: {},
    error: null
}
const refreshSlice = createSlice({
    name: 'refreshSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(refreshApi.pending, (state, action) => {
                state.loading = true;
            })
        // .addCase(refreshApi.)
    }
})