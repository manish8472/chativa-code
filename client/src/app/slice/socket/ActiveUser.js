import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users:null,
}

export const ActiveUsers = createSlice ({
    name: "activeusers",
    initialState,

    reducers: {
        setActiveUsers(state, action){
            state.users = action.payload;
        }
    }
})

export const {setActiveUsers} = ActiveUsers.actions;