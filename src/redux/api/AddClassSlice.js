import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const addClassApi = createAsyncThunk("AddClassApi", async (data, thunkApi) => {
    try {
        const response = await axios.post(
            `${baseUrl}/add-class`,
            {
                className: data.className,
            },
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
const addClassSlice = createSlice({
    name: "addClassSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addClassApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addClassApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(addClassApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString());
                state.data = {};
            });
    },
});
export default addClassSlice.reducer;
