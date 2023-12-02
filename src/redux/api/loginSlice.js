import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const loginApi = createAsyncThunk("loginApi", async (data, thunkApi) => {
  try {
    const response = await axios.post(
      `${baseUrl}/${data.user}/login`,
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
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
const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;

        localStorage.setItem("user", JSON.stringify(state.data.user));
        axios
          .get(`${baseUrl}/api/refresh`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        if (state.data.user.role === 0) {
          // alert("Login Successfully");

          toast.success("Login Successfull");
          setTimeout(() => {
            window.location.href = "/staff-dashboard";
          }, 3000);
        }
        if (state.data.user.role === 1) {
          toast.success("Login Successfull");
          setTimeout(() => {
            window.location.href = "/admin-dashboard";
          }, 3000);
        }

        if (state.data.user.role === 2) {
          // alert("Login Successfully");
          toast.success("Login Successfull");
          setTimeout(() => {
            window.location.href = "/teacher-dashboard";
          }, 3000);
        }
        if (state.data.user.role === 3) {
          // alert("Login Successfully");
          toast.success("Login Successfull");
          setTimeout(() => {
            window.location.href = "/student-dashboard";
          }, 3000);
        }
        state.error = null;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error.toString());
        // console.log(action.payload)
        state.data = {};
      });
  },
});
export default loginSlice.reducer;
