import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'
import {toast} from "react-toastify";

axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.VITE_BACKEND_URL;


export const addTeacherSubjectsApi = createAsyncThunk('addTeacherSubjectsApi', async (data, thunkApi) => {
    try {
        const response = await axios.put(`${baseUrl}/teacher/${data.id}`, {
                subjects: data.selectedCheckboxes
            },
            {withCredentials: true}
        );
        return response.data;
    } catch (error) {
        console.log(error)
        return thunkApi.rejectWithValue(error.response.data.msg);
    }
})

const initialState = {
    loading: false,
    data: {},
    error: null,
}
const addTeacherSubjectsSlice = createSlice({
    name: "addTeacherSubjectsSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addTeacherSubjectsApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addTeacherSubjectsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(addTeacherSubjectsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString())
                state.data = {};
            })
    }
})

export default addTeacherSubjectsSlice.reducer;