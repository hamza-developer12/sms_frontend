import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";

axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const addStaffApi = createAsyncThunk("AddStaffApi", async (data, thunkApi) => {
    try {
        const response = await axios.post(
            `${baseUrl}/add-staff`,
            {
                name: data.name,
                fatherName: data.fatherName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                cnic: data.cnic,
                bloodGroup: data.bloodGroup,
                presentAddress: data.presentAddress,
                permanentAddress: data.permanentAddress,
                password: data.password,
            },
            {withCredentials: true}
        );

        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg);
    }
});

const initialState = {
    loading: false,
    data: {},
    error: null,
};
const addStaffSlice = createSlice({
    name: "addStaffSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addStaffApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addStaffApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(state.data.msg.toString())
                state.error = null;
            })
            .addCase(addStaffApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(state.error.toString());
                state.data = {};
            });
    },
});
export default addStaffSlice.reducer;
