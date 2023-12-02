import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const getAllTeachersApi = createAsyncThunk("getAllTeachersApi", async (data, thunkApi) => {
    try {
        const response = await axios.get(
            `${baseUrl}/teachers`,

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
const getAllTeachersSlice = createSlice({
    name: "getAllTeachersSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllTeachersApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTeachersApi.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;

                state.error = null;
            })
            .addCase(getAllTeachersApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            });
    },
});
export default getAllTeachersSlice.reducer;
