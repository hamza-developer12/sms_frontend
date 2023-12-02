import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {toast} from "react-toastify";

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const logoutApi = createAsyncThunk('logoutApi', async (data, thunkApi) => {
    try {
        const response = await axios.get(`${baseUrl}/${data}/logout`, {
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

const logoutUserSlice = createSlice({
    name: 'logoutUserSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(logoutApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(logoutApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                localStorage.removeItem('user')
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000)
                state.error = null;
            })
            .addCase(logoutApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default logoutUserSlice.reducer