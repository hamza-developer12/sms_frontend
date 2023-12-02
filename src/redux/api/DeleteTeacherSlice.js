import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from 'react-toastify';

const baseUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
export const deleteTeacherApi = createAsyncThunk("deleteTeacherApi", async (data, thunkApi) => {
    try {
        const response = await axios.delete(
            `${baseUrl}/teachers/${data}`,
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
const deleteTeacherSlice = createSlice({
    name: "deleteTeacherSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(deleteTeacherApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTeacherApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(deleteTeacherApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString());
                state.data = {};
            });
    },
});
export default deleteTeacherSlice.reducer;
