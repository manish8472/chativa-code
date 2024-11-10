import React, {useState, useEffect } from 'react'
import profile from '../../../assets/profile.png'
import { useDispatch, useSelector } from 'react-redux';
import { setParticipants } from '../../../app/slice/ChatSlice';
import api from '../../../utils/axios';
import { formatTimeFromTimestamp, reduceSize } from '../../../methods/methods';
import { setChatMessages } from '../../../app/slice/MessageSlice';

const ChatContactList = ({
  searchText,
  openChat,
  userId,
  setParticipantsDetails,
}) => {
  const dispatch = useDispatch();
  // const [chatContacts, setChatContacts] = useState([]);
  const [filteredChatContacts, setFilteredChatContacts] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState([]);

  // This is for the NoContact component showing or not
  let contactExist = true;
  
  const chatContacts = (useSelector((state) => state.chatcontact.chatContactList));
  // setFilteredChatContacts(chatContacts);
  // console.log(chatContacts);

  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     try {
  //       const chatContacts = await api.get(`/get/chatcontact/${userId}`); // Make GET request
  //       console.log(chatContacts.data);
  //       // dispatch(setchatContactList(chatContacts.data));
  //       setChatContacts(chatContacts.data); // Update state with fetched data
  //       setFilteredChatContacts(chatContacts.data);
  //       if(chatContacts.length == 0) contactExist = false;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchContacts();
  // }, []); // Make sure useEffect runs when userId changes

  
  useEffect(() => {
    const filteredContacts = chatContacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchText.toLowerCase())
    ); // Filter out contacts with no last message

    setFilteredChatContacts(filteredContacts);
  }, [searchText, chatContacts]);

  const setChatParticipants = (user) => {
    const participants = {
      userId: userId,
      receiver: user,
    };
    setParticipantsDetails(participants);
    console.log(participants);
    dispatch(setParticipants(participants));
  };

  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    const findConversations = async () => {
      try {
        // Send POST request with userId in the request body
        const response = await api.get(`/get/messages/${conversationId}`);
        // setMessages(response.data);
        dispatch(setChatMessages(response.data));
        // console.log(response.data);
      } catch (err) {
        console.error(err);
        dispatch(setChatMessages([]));
        // setError("Error fetching contact list");
      }
    };
    if(conversationId)
    findConversations();
  }, [conversationId]);

 

  

  return (
    <div className="space-y-4 pb-4 flex flex-col">
      {/* Contact */}

      {filteredChatContacts
        .sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp)
        .map((contact, index) => (
          <div
            className="flex items-center p-1 cursor-pointer hover:bg-fuchsia-100 dark:hover:bg-gray-700"
            onClick={() => {
              setChatParticipants(contact);
              setConversationId(contact.conversationId);
              openChat();
            }}
            key={index}
          >
            <img
              src={contact.profileUrl || profile}
              alt="Profile"
              className="h-10 w-11  rounded-full"
            />
            <div className=" pl-4 flex justify-between flex-col w-full ">
              <div className="flex flex-row justify-between">
                <p className="font-semibold pb-1">{reduceSize(contact.name)}</p>
                <p className="text-xs text-gray-400 pb-1">
                  {formatTimeFromTimestamp(contact.lastMessage.timestamp)}
                </p>
              </div>
              <div className="flex flex-row justify-between text-center ">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {reduceSize(contact.lastMessage.message, 35)}
                </p>

                {contact.unreadMessages > 0 && (
                  <span className="text-sm text-gray-900 bg-yellow-300 dark:bg-yellow-600 rounded-full px-1">
                    {contact.unreadMessages}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

      {/* If No contact exist then show this page */}
      {/* <NoContact contactExist={chatContacts.length} /> */}
    </div>
  );
};

export default ChatContactList
