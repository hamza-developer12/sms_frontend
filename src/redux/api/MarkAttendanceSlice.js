import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "axios";
import {toast} from "react-toastify";

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const markAttendanceApi = createAsyncThunk('markAttendanceApi', async (data, thunkApi) => {
    try {
        const response = await axios.put(`${baseUrl}/attendance/mark-attendance/${data.id}`,
            {
                status: data.status,
                date: data.date
            },
            {withCredentials: true})

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
const markAttendanceSlice = createSlice({
    name: 'markAttendanceSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(markAttendanceApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(markAttendanceApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(markAttendanceApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString())
                state.data = {};
            })
    }
})

export default markAttendanceSlice.reducer;