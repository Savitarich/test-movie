import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
    },
});

export const { setSearchValue } = moviesSlice.actions;

export default moviesSlice.reducer;
