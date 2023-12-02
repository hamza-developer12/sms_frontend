import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getSingleTeacherApi = createAsyncThunk('getSingleTeacherApi',
    async (data, thunkAPI) => {

        try {
            const response = await axios.get(`${baseUrl}/teachers/${data}`,
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

const getSingleTeacherSlice = createSlice({
    name: 'getSingleTeacherSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSingleTeacherApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSingleTeacherApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSingleTeacherApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getSingleTeacherSlice.reducer;