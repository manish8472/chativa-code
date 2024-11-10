import React, { useState,useEffect } from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import ChatHeader from "../component/ChatHeader/ChatHeader";
import ChatMessages from "../component/ChatMessage/ChatMessages";
import MessageInput from "../component/ChatInput/MessageInput";
import LeftVerticalSidebar from "../component/Navigation/LeftVerticalSidebar";
import Settings from "../component/Sidebar/settings/Settings";
import ContactList from "../component/Sidebar/contact/ContactList";
import EmptyChat from "../component/ChatMessage/EmptyChat";
import {useAuth} from "../Hooks/useAuth";
import { useDispatch } from "react-redux";
import { getContacts } from "../routes/chatcontact";
import { senceMessage } from "../socket/senseMessage";
import { setParticipants } from "../app/slice/ChatSlice";

const ChatPage = () => {
  useAuth();

  const [isRecentContactOpen, setIsRecentContactOpen] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  // for mobile view chat open or recentContact open
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [participantsDetails, setParticipantsDetails] = useState({});

  const dispatch = useDispatch();
  
  // when come to home page then Empty Chat Message show when click on the chat contact then 
  // ChatMessage component open
  const [emptyChatOpen, setEmptyChatOpen] = useState(true);

  const openChat = () =>{
    setIsChatOpen(true);
    setEmptyChatOpen(false);
  } 

  const closeChat = () =>{
     setIsChatOpen(false);
     const participants = {
      userId: JSON.parse(localStorage.getItem("currentUser"))?.userId,
      receiver: {
        conversationId: null,
        profileUrl: null,
        userId: null,
        name: "",
        email: null,
        lastMessage: [{message: "", timestamp: Date.now()}]
      }
     }
     dispatch(setParticipants(participants));
     setEmptyChatOpen(true);
  }

  const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;

 
  // // store chat contact list
  getContacts({userId, dispatch});
  
  // If socket io getMessage then it will update the chat message and chat contact list
  senceMessage(dispatch);


  return (
    <div className="flex flex-col md:flex-row text-sm ">
      {/* Left Vertical Sidebar with icons */}
      <LeftVerticalSidebar
        {...{
          isRecentContactOpen,
          setIsRecentContactOpen,
          openSettings,
          setOpenSettings,
          openContacts,
          setOpenContacts,
          isChatOpen,
        }}
      />
      {/* Sidebar */}
      {isRecentContactOpen && !openContacts && !openSettings && (
        <Sidebar
          {...{ openChat, isChatOpen, userId, setParticipantsDetails }}
        />
      )}
      {/* Setting open or not */}
      {!isRecentContactOpen && !openContacts && openSettings && <Settings />}

      {/* Contact List open or not */}
      {!isRecentContactOpen && openContacts && !openSettings && (
        <ContactList {...{ userId }} />
      )}

      {/* Chat components - Full screen on mobile when chat is open */}

      {!emptyChatOpen && (
        <div
          className={`flex-col h-screen w-full transition-transform duration-300 ${
            isChatOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <ChatHeader closeChat={closeChat} />
          <div className="flex-1 overflow-y-auto">
            <ChatMessages />
          </div>
          <MessageInput />
        </div>
      )}

      <EmptyChat participantsDetails={participantsDetails} />
    </div>
  );
};

export default ChatPage;
