import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const getAllClassesApi = createAsyncThunk("getAllClassesApi", async (data, thunkApi) => {
    try {
        const response = await axios.get(
            `${baseUrl}/classes`,

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
const getAllClassesSlice = createSlice({
    name: "getAllClassesSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllClassesApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllClassesApi.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;

                state.error = null;
            })
            .addCase(getAllClassesApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = {};
            });
    },
});
export default getAllClassesSlice.reducer;
