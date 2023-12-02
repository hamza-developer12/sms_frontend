import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";

import axios from 'axios';
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const addTestApi = createAsyncThunk('addTestApi' , async (data , thunkApi) => {
    try {

        const response = await axios.post(`${ baseUrl }/create-quiz` ,
            {
                ...data
            }
            , { withCredentials : true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg);
    }

})

const initialState = {
    loading : false ,
    data : {} ,
    error : null ,
}

const addTestSlice = createSlice({
    name : 'addTestSlice' ,
    initialState ,
    extraReducers : (builder) => {
        builder
            .addCase(addTestApi.pending , (state , action) => {
                state.loading = true;
            })
            .addCase(addTestApi.fulfilled , (state , action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg)
                state.error = null;
            })
            .addCase(addTestApi.rejected , (state , action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error)
                state.data = {};
            })
    }
})

export default addTestSlice.reducer;