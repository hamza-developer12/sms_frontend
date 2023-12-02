import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getSingleQuizApi = createAsyncThunk('getSingleQuizApi', async (data, thunkApi) => {
    try {
        const response = await axios.get(`${baseUrl}/quiz/${data}`, {
            withCredentials: true,
        })
        return response.data;
    } catch (e) {
        return thunkApi.rejectWithValue(e.response.data.msg)
    }
})

const initialState = {
    loading: false,
    data: {},
    error: null,
}

const getSingleQuizSlice = createSlice({
    name: 'getSingleQuizSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSingleQuizApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSingleQuizApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSingleQuizApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getSingleQuizSlice.reducer;