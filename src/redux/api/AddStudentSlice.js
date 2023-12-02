import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'
import {toast} from "react-toastify";

const baseUrl = import.meta.env.VITE_BACKEND_URL;


export const addStudentApi = createAsyncThunk('addStudentApi', async (data, thunkApi) => {
    try {
        const response = await axios.post(`${baseUrl}/students/register-student`, {
                fullName: data.fullName,
                studentRollNumber: data.studentRollNumber,
                gender: data.gender,
                email: data.email,
                password: data.password,
                classId: data.classId,
            },
            {withCredentials: true}
        );
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg);
    }
})

const initialState = {
    loading: false,
    data: {},
    error: null,
}
const addStudentSlice = createSlice({
    name: "addStudentSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addStudentApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addStudentApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(addStudentApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString())
                state.data = {};
            })
    }
})

export default addStudentSlice.reducer;