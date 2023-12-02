import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getSingleStudentApi = createAsyncThunk('getSingleStudentApi',
    async (data, thunkAPI) => {

        try {
            const response = await axios.get(`${baseUrl}/students/${data}`,
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

const getSingleStudentSlice = createSlice({
    name: 'getSingleStudentSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSingleStudentApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSingleStudentApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSingleStudentApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default getSingleStudentSlice.reducer;