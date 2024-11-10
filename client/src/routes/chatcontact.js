import { setchatContactList } from "../app/slice/ChatContactListSlice";
import api from "../utils/axios";
import ChatContactList from "../component/Sidebar/chat/ChatContactList";


export const getContacts = async ({userId, dispatch}) => {
 
console.log(userId)
  try {
    const chatContacts = await api.get(`/get/chatcontact/${userId}`); // Make GET request
    // console.log(chatContacts.data);
    dispatch(setchatContactList(chatContacts.data));
    if (chatContacts.length == 0) contactExist = false;
  } catch (err) {
    console.error(err);
  }
};

export const increaseUnreadCount = async ({conversationId, userId , message, dispatch}) => {
    
    // if conversationId match then update unread count
    console.log("conversationId",conversationId);
    
  try {
    const response = await api.put(`/chatcontact/update/increaseunreadcount`, {conversationId,userId,message});
    dispatch(ChatContactList(JSON.stringify(response.data)));
    // console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

export const decreaseUnreadCount = async ({conversationId, userId, dispatch}) => {
    console.log("decreaseUnreadCount",conversationId);
  try {
    const response = await api.put("/chatcontact/update/decreaseunreadcount", {conversationId,userId});
    
  } catch (err) {
    console.error(err);
  }
};
