import {createSlice} from "@reduxjs/toolkit";

let resultData;
let query;
const initialState = {
    error: null,
    loading: false,
    studentData: {},
    data: [],
}
const searchSlice = createSlice({
    name: "searchSlice",
    initialState,

    reducers: {
        getResult: (state, action) => {
            state.studentData = action.payload;
            resultData = state.studentData;
        },
        searchResult: (state, action) => {
            query = action.payload;
            state.data = resultData.filter((item) => item.studentRollNumber.toString().includes(query))

            if (query.length === 0) {
                state.error = null;
                state.data = [];
            }
            if (state.data.length === 0) {
                state.error = "Student Not Found";
                state.data = [];

            } else if (state.data.length > 0) {
                state.error = null;
            }
        }
    }
})

export default searchSlice.reducer;
export const {searchResult, getResult} = searchSlice.actions;