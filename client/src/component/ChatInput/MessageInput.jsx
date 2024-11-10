import React, { useEffect, useId, useRef, useState } from "react";
import Emoji from "./Emoji";
import api from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setChatMessages } from "../../app/slice/MessageSlice";
import { fileUpload, submitMessage } from "../../routes/message";
import { getFileExtension, moveConversationToTop } from "../../methods/methods";
import { socket } from "../../socket/socket";
import { getContacts } from "../../routes/chatcontact";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [file, setFile] = useState({});
  const [refreshChatContact, setRefreshChatContact] = useState(false);

  const toggleEmoji = (e) => {
    e.preventDefault();
    setIsEmojiOpen(!isEmojiOpen);
  };

 

  /**
   * When Sender Sen Messae then api call will be made and update the database
   */

  // Find Convesations of user
  const receiver = useSelector(
    (state) => state.chatuser.participants.receiver
  );
  const senderId = JSON.parse(localStorage.getItem("currentUser"))?.userId;
  const receiverId = useSelector((state) => state.chatuser?.participants).receiver.userId;

   const chatContacts = useSelector(
     (state) => state.chatcontact.chatContactList
   );

  const handleMessageSubmit = async (e) => {
    // e.preventDefault();
    if (file.name) {
      if(file.size >550000){
        alert("Your can't send file size greater 500kb")
      }
      else {
        let data = new FormData();
        data.append("file", file);
        data.append("name", file?.name);
        const res = await fileUpload(data);

        let extension = getFileExtension(file.name);
        let type = "file";
        if(
          extension === "jpg" ||
          extension === "png" ||
          extension === "jpeg"
        ) {
          type = "image";
        }
        else if(extension === "pdf"){
          type = "pdf"
        }
        const message = {
          message: file.name,
          conversationId: receiver.conversationId,
          type: type,
          senderId: senderId,
          receiverId: receiver.userId,
          fileUrl: res,
          timestamp: Date.now(),
        };
        dispatch(setChatMessages(message));

        
        const newMessage = await submitMessage({
          message: file.name,
          conversationId: receiver.conversationId,
          type: type,
          senderId: senderId,
          receiverId: receiver.userId,
          fileUrl: res,
        });
        socket.emit("sendMessage", message);
        console.log(data);
        console.log(res);
      }
      setMessageText("");
    }
    // check if message is not empty
    else if (messageText.trim() !== "") {
      // send message
      console.log(messageText);

      try {
        // Send POST request with conversationId in the request body
        const message = {
          message: messageText,
          conversationId: receiver.conversationId,
          type: "text",
          senderId: senderId,
          receiverId: receiver.userId,
          fileUrl: "",
          timestamp: Date.now(),
        };
        dispatch(setChatMessages(message));
        
        const response = await api.post("/add/message", {
          message: messageText,
          conversationId: receiver.conversationId,
          type: "text",
          senderId: senderId,
          receiverId: receiver.userId,
          fileUrl: "",
        });
        socket.emit("sendMessage", message);
        // console.log(response.data);
        // dispatch(setChatMessages(response.data));
      } catch (err) {
        console.log(err);
      }
    }
    setFile({});
    setMessageText("");
    setRefreshChatContact(true);
  };

  if(refreshChatContact){
    getContacts({userId:senderId, dispatch});
    setRefreshChatContact(false);
  }

  const handleKeyPress = (event) =>{
    if(event.key === "Enter"){
      handleMessageSubmit();
    }
  }

  const handleFileChange = (e) => {
    // e.preventDefault();
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    setMessageText(e.target.files[0].name);
  };

  return (
    <div className="flex items-center p-4 border-t bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <button className="text-indigo-500 ">
        <div className="relative">
          <Emoji {...{ isEmojiOpen, setIsEmojiOpen, setMessageText }} />
          <i className="fas fa-smile px-2" onClick={toggleEmoji}></i>
        </div>
      </button>
      
      <label htmlFor="fileInput" className="cursor-pointer">
        <i className="fas fa-paperclip px-3 text-indigo-500" type="file"></i>
      </label>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange} // Make sure this is attached
      />

      <input
        type="text"
        placeholder="Enter Message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 py-2 px-3 border rounded-md focus:outline-none bg-fuchsia-50 dark:bg-gray-700 dark:border-none"
      />

      <button
        className="bg-indigo-600 text-white px-2 py-2 rounded-md ml-3 md:hidden"
        onClick={handleMessageSubmit}
      >
        <i className="fas fa-paper-plane" type="file"></i>
      </button>
    </div>
  );
};

export default MessageInput;
