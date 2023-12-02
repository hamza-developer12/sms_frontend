import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getSingleStaffApi = createAsyncThunk('getSingleStaffApi',
    async (data, thunkAPI) => {

        try {
            const response = await axios.get(`${baseUrl}/staff/${data}`,
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

const getSingleStaffSlice = createSlice({
    name: 'getSingleStaffSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSingleStaffApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSingleStaffApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSingleStaffApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getSingleStaffSlice.reducer;