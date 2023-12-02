import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from 'axios';

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getTeacherStudentsApi = createAsyncThunk('getTeacherStudentsApi', async (data, thunkApi) => {
    try {
        const response = await axios.get(`${baseUrl}/teacher/subject-students`, {
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
const getTeacherStudentsSlice = createSlice({
    name: 'getTeacherStudentsSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTeacherStudentsApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTeacherStudentsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getTeacherStudentsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getTeacherStudentsSlice.reducer;