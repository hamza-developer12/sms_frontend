import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from 'axios';

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getTeacherSubjectsApi = createAsyncThunk('getTeacherSubjectsApi', async (data, thunkApi) => {
    try {
        const response = await axios.get(`${baseUrl}/teacher/subjects`, {
            withCredentials: true,
        })

        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg)
    }
})

const initialState = {
    loading: false,
    data: {},
    error: null,
}
const getTeacherSubjectsSlice = createSlice({
    name: 'getTeacherSubjectsSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTeacherSubjectsApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTeacherSubjectsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getTeacherSubjectsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getTeacherSubjectsSlice.reducer;