import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from 'axios';
import {toast} from "react-toastify";

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const createAttendanceApi = createAsyncThunk('createAttendanceApi', async (data, thunkApi) => {
    try {
        const response = await axios.post(`${baseUrl}//attendance/create-attendance/${data.teacher}`, {
            month: data.month,
        }, {
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
const createAttendanceSlice = createSlice({
    name: 'createAttendanceSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createAttendanceApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createAttendanceApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(createAttendanceApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString())
                state.data = {};
            })
    }
})

export default createAttendanceSlice.reducer;
