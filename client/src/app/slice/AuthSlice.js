import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    currentUser: null,
};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setUser(state, action) {
           state.currentUser = action.payload;
        },
        
        removeAuth(state) {
            state.currentUser = null;
        },
    },
})

export const {setUser, removeAuth} = AuthSlice.actions;