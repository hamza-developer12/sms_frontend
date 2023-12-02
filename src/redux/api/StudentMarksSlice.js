import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const studentMarksApi = createAsyncThunk("studentMarksApi", async (data, thunkApi) => {
    try {
        const response = await axios.get(
            `${baseUrl}/student/marks`,

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
const studentMarksSlice = createSlice({
    name: "studentMarksSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(studentMarksApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(studentMarksApi.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;

                state.error = null;
            })
            .addCase(studentMarksApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            });
    },
});
export default studentMarksSlice.reducer;
