import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DarkState {
    darkMode: boolean;
}

const initialState : DarkState = {
    darkMode: true,
};

const darkSlice = createSlice({
    name: "dark",
    initialState,
    reducers: {
        toggleDarkMode: (state,action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
    },
});
export const { toggleDarkMode} = darkSlice.actions;
export default darkSlice.reducer;