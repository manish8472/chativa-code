import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    contact:[],
}

export const ContactList = createSlice({
    name: "contact",
    initialState,

    reducers: {
        setContactList(state, action){
            state.contact = [...action.payload];
        }
    }
})

export const {setContactList} = ContactList.actions;