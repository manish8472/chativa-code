import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from './slice/AuthSlice'
import { ChatSlice } from "./slice/ChatSlice";
import { ChatContactListSlice } from "./slice/ChatContactListSlice";
import { UserProfileSlice } from "./slice/UserProfile";
import { MessageSlice } from "./slice/MessageSlice";
import { ContactList } from "./slice/ContactSlice";
import { ActiveUsers } from "./slice/socket/ActiveUser";


const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        chatuser: ChatSlice.reducer,
        chatcontact: ChatContactListSlice.reducer,
        user: UserProfileSlice.reducer,
        message: MessageSlice.reducer,
        contact: ContactList.reducer,
        activeUsers: ActiveUsers.reducer,
    }
})

export default store;
