import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from 'axios';

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getStudentTestsApi = createAsyncThunk('getStudentTestsApi', async (data, thunkApi) => {
    try {
        const response = await axios.get(`${baseUrl}/student-quizzes`,
            {withCredentials: true})
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
const getStudentTestsSlice = createSlice({
    name: 'getStudentTestsApi',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getStudentTestsApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getStudentTestsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getStudentTestsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getStudentTestsSlice.reducer;