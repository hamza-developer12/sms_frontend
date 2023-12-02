import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getSingleSubjectApi = createAsyncThunk('getSingleSubjectApi',
    async (data, thunkAPI) => {

        try {
            const response = await axios.get(`${baseUrl}/subject/${data}`,
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

const getSingleSubjectSlice = createSlice({
    name: 'getSingleSubjectSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSingleSubjectApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSingleSubjectApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSingleSubjectApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getSingleSubjectSlice.reducer;