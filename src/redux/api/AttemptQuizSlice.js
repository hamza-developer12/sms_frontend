import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const attemptQuizApi = createAsyncThunk('attemptQuizApi', async (data, thunkApi) => {
    try {
        const response = await axios.post(`${baseUrl}/attempt-quiz`, {
            quizId: data.quizId,
            totalMarks: data.totalMarks,
            marksObtained: data.marksObtained,
            quizName: data.quizName
        }, {
            withCredentials: true,
        })
        return response.data;
    } catch (e) {
        return thunkApi.rejectWithValue(e.response.data.msg);
    }
})

const initialState = {
    loading: false,
    data: {},
    error: null,
}

const attemptQuizSlice = createSlice({
    name: 'attemptQuizSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(attemptQuizApi.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(attemptQuizApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(attemptQuizApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString())
                state.data = {};
            })
    }
})
export default attemptQuizSlice.reducer;