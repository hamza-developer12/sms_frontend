import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const getAllSubjectsApi = createAsyncThunk("getAllSubjectsApi", async (data, thunkApi) => {
    try {
        const response = await axios.get(
            `${baseUrl}/subjects`,

            {withCredentials: true}
        );

        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg);
    }
});

const initialState = {
    error: null,
    data: {},
    loading: false,
};
const getAllSubjectsSlice = createSlice({
    name: "getAllSubjectsSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllSubjectsApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSubjectsApi.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;

                state.error = null;
            })
            .addCase(getAllSubjectsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            });
    },
});
export default getAllSubjectsSlice.reducer;
