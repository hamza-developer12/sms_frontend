import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from 'react-toastify';

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const addSubjectApi = createAsyncThunk("addSubjectApi", async (data, thunkApi) => {
    try {
        const response = await axios.post(
            `${baseUrl}/add-subject`,
            {
                name: data.subjectName,
                subjectTeacher: data.subjectTeacher,
                classId: data.classId,
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
const addSubjectSlice = createSlice({
    name: "addSubjectSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addSubjectApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSubjectApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(addSubjectApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString());
                state.data = {};
            });
    },
});
export default addSubjectSlice.reducer;
