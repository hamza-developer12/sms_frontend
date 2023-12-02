import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getSingleStudentMarksApi = createAsyncThunk('getSingleStudentMarksApi', async (data, thunkApi) => {
    try {
        const response = await axios.get(`${baseUrl}/teacher/student-marks/${data}`, {
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

const getSingleStudentMarksSlice = createSlice({
    name: 'getSingleStudentMarksSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSingleStudentMarksApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSingleStudentMarksApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSingleStudentMarksApi.rejected, (state, action) => {
                state.loading = false;
                state.data = {};
                state.error = action.payload;
            })
    }
})

export default getSingleStudentMarksSlice.reducer;