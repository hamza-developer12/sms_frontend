import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from 'react-toastify';

const baseUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
export const deleteClassApi = createAsyncThunk("deleteClassApi", async (data, thunkApi) => {
    try {
        const response = await axios.delete(
            `${baseUrl}/classes/${data}`,
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
const deleteClassSlice = createSlice({
    name: "deleteClassSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(deleteClassApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClassApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(deleteClassApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString());
                state.data = {};
            });
    },
});
export default deleteClassSlice.reducer;
