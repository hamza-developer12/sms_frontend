import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from 'react-toastify';

const baseUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
export const deleteStudentApi = createAsyncThunk("deleteStudentApi", async (data, thunkApi) => {
    try {
        const response = await axios.delete(
            `${baseUrl}/students/${data}`,
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
const deleteStudentSlice = createSlice({
    name: "deleteStudentSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(deleteStudentApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStudentApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(deleteStudentApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString());
                state.data = {};
            });
    },
});
export default deleteStudentSlice.reducer;
