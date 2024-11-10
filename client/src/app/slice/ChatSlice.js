import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    participants:[],
};

export const ChatSlice = createSlice({
    name: "chat",
    initialState,

    reducers: {
        setParticipants(state, action) {
            state.participants = action.payload
        }, 
    },
});

export const { setParticipants} = ChatSlice.actions;