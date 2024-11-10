import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const UserProfileSlice = createSlice({
    name: "userProfile",
    initialState,

    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },  
    },
});

export const { setUser } = UserProfileSlice.actions;