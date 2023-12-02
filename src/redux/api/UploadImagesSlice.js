import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const uploadImagesApi = createAsyncThunk('uploadImagesApi', async (data, thunkApi) => {
    const formData = new FormData();
    try {
        // console.log(data)
        formData.append("images", data[0])
        formData.append("images", data[1])
        formData.append("images", data[2])
        formData.append("images", data[3])
        formData.append("images", data[4])
        const response = await axios.post(`${baseUrl}/upload-images`, formData, {
            withCredentials: true
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

const uploadImagesSlice = createSlice({
    name: "uploadImagesSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(uploadImagesApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(uploadImagesApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(uploadImagesApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            })
    }
})

export default uploadImagesSlice.reducer;