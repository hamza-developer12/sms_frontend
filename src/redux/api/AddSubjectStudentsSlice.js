import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'
import {toast} from "react-toastify";

axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.VITE_BACKEND_URL;


export const addSubjectStudentsApi = createAsyncThunk('addSubjectStudentsApi', async (data, thunkApi) => {
    try {
        const response = await axios.put(`${baseUrl}/student/add-subjects/${data.id}`, {
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
const addSubjectStudentsSlice = createSlice({
    name: "addSubjectStudentsSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addSubjectStudentsApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addSubjectStudentsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(addSubjectStudentsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString())
                state.data = {};
            })
    }
})

export default addSubjectStudentsSlice.reducer;