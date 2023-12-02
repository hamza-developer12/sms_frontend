import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getSingleClassApi = createAsyncThunk('getSingleClassApi',
    async (data, thunkAPI) => {

        try {
            const response = await axios.get(`${baseUrl}/classes/${data}`,
                {withCredentials: true}
            )
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    })

const initialState = {
    loading: false,
    data: {},
    error: null,
}

const getSingleClassSlice = createSlice({
    name: 'getSingleClassSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSingleClassApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSingleClassApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSingleClassApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getSingleClassSlice.reducer;