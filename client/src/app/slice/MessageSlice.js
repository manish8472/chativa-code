import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message : [],
}

export const MessageSlice = createSlice({
    name: "message",
    initialState,

    reducers: {
        setChatMessages(state, action){
            if (Array.isArray(action.payload)) {
              state.message = [...action.payload]; // Append array of messages
            } else {
              state.message = [...state.message, action.payload]; // Append single message
            }
        }
    }
})

export const {setChatMessages} = MessageSlice.actions;
