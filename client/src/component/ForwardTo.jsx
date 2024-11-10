import React,{useState, useEffect} from "react";
import profile from "../assets/profile.png";
import { reduceSize } from "../methods/methods";
import api from "../utils/axios";
 ;

const ForwardTo = ({ isForwandOpen, setIsForwandOpen, message, chatUserId}) => {
   
     if (!isForwandOpen) return null;
    const [searchText, setSearchText] = useState("");
    const [chatContacts, setChatContacts] = useState([])
    
     // forward contact when you forward
    const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;

    const [filteredChatContacts, setFilteredChatContacts] = useState([]);

    
    
    useEffect(() => {
      const fetchContacts = async () => {
        try {
          let res = await api.get(`/get/chatcontact/${userId}`); // Make GET request
          console.log(res.data);
          res = res.data.filter((contact) => contact.userId !== chatUserId)
          setChatContacts(res); // Update state with fetched data
          setFilteredChatContacts(res);
        } catch (err) {
          console.error(err);
        }
      };
      fetchContacts();
    }, []);

    useEffect(() => {
      const filteredContacts = chatContacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchText.toLowerCase())
      ); // Filter out contacts with no last message
      setFilteredChatContacts(filteredContacts);
    }, [searchText]);

    

  // send message when click on forward
    const sendMessage = async (contact) => {
      const conversationId = contact.conversationId;
      console.log(contact.conversationId);
      
      if (message.trim() !== "") {
        // send message
        console.log(message);

        try {
          // Send POST request with conversationId in the request body
          const response = await api.post("/add/message", {
            message: message,
            conversationId: conversationId,
            type: "text",
            senderId: userId,
          });
          console.log(response.data);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      setIsForwandOpen(false)
    }
  }
  
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 `}
    >
      <div className="bg-fuchsia-100 rounded-lg p-3 pb-0 w-full h-full max-h-96 max-w-96 flex flex-col items-center dark:bg-gray-700 dark:text-white">
        {/* Logo */}

        {/* Search Bar */}

        <h3 className="text-xl font-semibold mb-3">Forward to </h3>

        <div className="my-4 w-full">
          <input
            type="text"
            placeholder="Search Users"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full py-2 px-3 rounded-md border focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-400"
          />
        </div>
        {/* Recent Contacts */}
        <div className="py-6 overflow-y-scroll flex-1 bg-fuchsia-50 w-full dark:bg-gray-800">
          <div className="space-y-4 pb-4 flex flex-col">
            {/* Contact */}

            {filteredChatContacts.map((contact, index) => (
              <div
                className="flex items-center p-1 cursor-pointer hover:bg-fuchsia-100 dark:hover:bg-gray-900"
                key={index}
                onClick={() => sendMessage(contact)}
              >
                <img
                  src={profile}
                  alt="Patrick"
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex justify-between flex-col w-full ">
                  <div className="flex flex-row justify-between">
                    <p className="font-semibold pb-1">
                      {reduceSize(contact.name)}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between text-center ">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hey! there I'm available
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Add more contacts similarly */}
          </div>
        </div>
        <div className="flex justify-end w-full py-2">
          <button
            className="bg-fuchsia-400 text-white p-2  rounded-md hover:bg-fuchsia-500 focus:outline-none"
            onClick={() => setIsForwandOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForwardTo;
