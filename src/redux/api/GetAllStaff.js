import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const getAllStaffApi = createAsyncThunk("getAllStaffApi", async (data, thunkApi) => {
    try {
        const response = await axios.get(
            `${baseUrl}/staff`,

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
const getAllStaffSlice = createSlice({
    name: "getAllStaffSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllStaffApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStaffApi.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;

                state.error = null;
            })
            .addCase(getAllStaffApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            });
    },
});
export default getAllStaffSlice.reducer;
