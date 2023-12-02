import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getSpecificSubjectsApi = createAsyncThunk('getSpecificSubjectsApi',
    async (data, thunkAPI) => {

        try {
            const response = await axios.get(`${baseUrl}/student/specific-subjects/${data}`,
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

const getSpecificSubjectsSlice = createSlice({
    name: 'getSpecificSubjectsApi',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSpecificSubjectsApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSpecificSubjectsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSpecificSubjectsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getSpecificSubjectsSlice.reducer;