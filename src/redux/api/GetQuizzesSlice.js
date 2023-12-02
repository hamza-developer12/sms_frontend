import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from 'axios';

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getQuizzesApi = createAsyncThunk('getQuizzesApi', async (data, thunkApi) => {
    try {

        const response = await axios.get(`${baseUrl}/quizzes`, {withCredentials: true})
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg);
    }
})

const initialState = {
    loading: false,
    data: {},
    error: null,
}

const getQuizzesSlice = createSlice({
    name: 'getQuizzesSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getQuizzesApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getQuizzesApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getQuizzesApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getQuizzesSlice.reducer;