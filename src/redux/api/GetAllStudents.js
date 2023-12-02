import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const getAllStudentsApi = createAsyncThunk("getAllStudentsApi", async (data, thunkApi) => {
    try {
        const response = await axios.get(
            `${baseUrl}/students`,

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
const getAllStudentsSlice = createSlice({
    name: "getAllStudentsSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllStudentsApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStudentsApi.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;

                state.error = null;
            })
            .addCase(getAllStudentsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            });
    },
});
export default getAllStudentsSlice.reducer;
