import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  chatContactList: [],
};

export const ChatContactListSlice = createSlice({
  name: "chatContactList",
  initialState,

  reducers: {
    setchatContactList(state, action) {
        
      state.chatContactList = [...action.payload];
    },
  },
});

export const { setchatContactList } = ChatContactListSlice.actions;