import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const userDetailsApi = createAsyncThunk('userDetailsApi', async (data, thunkAPI) => {
    try {
        const response = await axios.get(`${baseUrl}/${data}`, {
            withCredentials: true,
        })

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

const initialState = {
    loading: false,
    data: {},
    error: null,
}

const userDetailsSlice = createSlice({
    name: "userDetailsSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(userDetailsApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userDetailsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(userDetailsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default userDetailsSlice.reducer;