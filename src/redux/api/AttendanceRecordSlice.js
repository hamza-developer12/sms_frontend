import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from 'axios';

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const attendanceRecordApi = createAsyncThunk('attendanceRecordApi', async (data, thunkApi) => {
    try {
        const response = await axios.get(`${baseUrl}//teacher/attendance-details/${data}`, {
            withCredentials: true,
        })
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

const attendanceRecordSlice = createSlice({
    name: 'attendanceRecordSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(attendanceRecordApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(attendanceRecordApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(attendanceRecordApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default attendanceRecordSlice.reducer;