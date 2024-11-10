import React, { useState, useEffect, useRef } from "react";
import useClickOutside from "../../Hooks/ClickOutside";
import DropDown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import { DateMatched,   formatTimeFromTimestamp, formatTimestamp } from "../../methods/methods";
import { decreaseUnreadCount } from "../../routes/chatcontact";

const ChatMessages = () => {
  const [DropDownValue, setDropDownValue] = useState(-1);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState([]);

  const dispatch = useDispatch();

  const toggleDropDown = (id) => {
    if (id === DropDownValue) {
      setDropDownValue(-1);
      setIsOpenDropDown(false);
    } else {
      setDropDownValue(id);
      setIsOpenDropDown(true);
    }
  };

  let conversationId = useSelector(
    (state) => state.chatuser?.participants.receiver.conversationId
  );

  //  console.log(conversationId);
  // useEffect(() => {

  //   const findConversations = async () => {
  //     try {
  //       // Send POST request with userId in the request body
  //       console.log(conversationId)
  //       const response = await api.get(`/get/messages/${conversationId}`);
  //       setMessages(response.data);
  //       dispatch(setChatMessages(response.data));
  //       // console.log(response.data);
  //     } catch (err) {
  //       console.error(err);
  //       // setError("Error fetching contact list");
  //     }
  //   };

  //   findConversations();
  // }, [conversationId]);

  const closeDropDown = () => {
    setIsOpenDropDown(false);
  };

  const dropdownRef = useClickOutside(closeDropDown);

  // find sender id from local storage
  const senderId = JSON.parse(localStorage.getItem("currentUser"))?.userId;

  // setMessages()
  let messages = useSelector((state) => state.message.message);

  // automatic go to the
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  
  // useEffect(() => {
  //   socket.on("getMessage", (msg) => {
  //     console.log(senderId)
  //     setIncomingMessage(msg);
  //   });
  // }, []);

  // // const chatContactList = useSelector(
  // //   (state) => state.chatcontact.chatContactList
  // // );

  // // update incomming message using socket io
  // useEffect(() => {
  //   const message = {
  //     message: incomingMessage.message,
  //     timestamp: incomingMessage.timestamp,
  //     fileUrl: incomingMessage.fileUrl || "",
  //     type: incomingMessage.type,
  //     senderId: incomingMessage.senderId,
  //   };
  //   if (
  //     incomingMessage.receiverId === senderId &&
  //     incomingMessage.conversationId === conversationId
  //   ) {
  //     dispatch(setChatMessages(message));
  //   }
  //   else if(
  //     incomingMessage.receiverId === senderId &&
  //     incomingMessage.conversationId !== conversationId
  //   ) {
  //     console.log("increse unread count");
  //     // increaseUnreadCount({
  //     //   userId: incomingMessage.receiverId,
  //     //   conversationId: incomingMessage.conversationId,
  //     // });
  //   }
  // }, [incomingMessage]);

   useEffect(() => {
     if (conversationId) {
       decreaseUnreadCount({
         userId: senderId,
         conversationId: conversationId,
         dispatch,
       });
     }
   }, [conversationId]);

  
  

  return (
    <div className="chat-container flex flex-col  space-y-4 bg-white dark:bg-gray-900 h-full overflow-hidden dark:text-white">
      <div className="overflow-y-scroll space-y-2 py-6 h-full px-6">
        {/* Sender's Message */}

        {/*Message */}
        {messages.map((message, index) => (
          <div className="" key={index}>
            {index > 0 &&
              DateMatched(messages[index - 1].timestamp, message.timestamp) && (
                <div className="flex w-full justify-center items-center my-4">
                  <div className="border-b flex-1 border-gray-100 dark:border-gray-800"></div>
                  <div className=" bg-gray-200 dark:bg-gray-700 px-2 rounded-xl text-sm">
                    {formatTimestamp(message.timestamp)}
                  </div>{" "}
                  <div className="border-b flex-1 border-gray-100 dark:border-gray-800"></div>
                </div>
              )}

            {message.senderId != senderId && (
              <div>
                {message.type === "text" && (
                  <div className="flex space-x-3 items-center ">
                    <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-lg max-w-xs md:max-w-lg">
                      <p className="pr-8">{message.message}</p>
                      <span className="text-xs text-gray-400 float-end scale-95">
                        {formatTimeFromTimestamp(message.timestamp)}
                      </span>
                    </div>

                    <DropDown
                      {...{
                        type: "text",
                        isOpenDropDown,
                        setIsOpenDropDown,
                        message,
                        index,
                        toggleDropDown,
                        DropDownValue,
                      }}
                    />
                  </div>
                )}

                {message.type === "image" && (
                  <div className="flex space-x-3 items-center">
                    <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-lg max-w-xs">
                      <img
                        src={message.fileUrl}
                        alt="Profile"
                        className=" max-w-40 rounded-lg"
                      />
                      <span className="text-xs text-gray-400 float-end scale-95 ">
                        10:02
                      </span>
                    </div>
                    <DropDown
                      {...{
                        type: "image",
                        isOpenDropDown,
                        setIsOpenDropDown,
                        message,
                        index,
                        toggleDropDown,
                        DropDownValue,
                      }}
                    />
                  </div>
                )}

                {message.type === "file" && (
                  <div className="flex space-x-3 items-center">
                    <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-lg max-w-xs">
                      <div className="flex flex-row p-2 bg-white rounded-md dark:bg-gray-800">
                        <i class="fa-solid fa-file text-purple-400 text-4xl mr-2"></i>
                        <p>{message.message}</p>
                      </div>
                      <span className="text-xs text-gray-400 float-end scale-95">
                        10:02
                      </span>
                    </div>
                    <DropDown
                      {...{
                        type: "file",
                        isOpenDropDown,
                        setIsOpenDropDown,
                        message,
                        index,
                        toggleDropDown,
                        DropDownValue,
                      }}
                    />
                  </div>
                )}

                {message.type === "pdf" && (
                  <div className="flex space-x-3 items-center dark:text-white">
                    <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-lg max-w-xs ">
                      <div className="flex flex-row p-2 bg-white rounded-md dark:bg-gray-800">
                        <i className="fa-solid fa-file-pdf text-red-600 text-3xl mr-2"></i>
                        <p>{message.message}</p>
                      </div>
                      <span className="text-xs text-gray-400 float-end scale-95">
                        10:02
                      </span>
                    </div>
                    <DropDown
                      {...{
                        type: "pdf",
                        isOpenDropDown,
                        setIsOpenDropDown,
                        message,
                        index,
                        toggleDropDown,
                        DropDownValue,
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* sender message showing */}

            {message.senderId === senderId && (
              <div>
                {message.type === "text" && (
                  <div className="flex justify-end space-x-3 items-center">
                    <DropDown
                      {...{
                        type: "text",
                        isOpenDropDown,
                        setIsOpenDropDown,
                        message,
                        index,
                        toggleDropDown,
                        DropDownValue,
                      }}
                    />

                    <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-lg max-w-xs lg:max-w-lg">
                      <div className="pr-8 "> {message.message}</div>
                      <span className="text-xs text-gray-400 float-end scale-95">
                        {formatTimeFromTimestamp(message.timestamp)}
                      </span>
                    </div>
                  </div>
                )}

                {message.type === "image" && (
                  <div className="flex justify-end space-x-3 items-center">
                    <DropDown
                      {...{
                        type: "image",
                        isOpenDropDown,
                        setIsOpenDropDown,
                        message,
                        index,
                        toggleDropDown,
                        DropDownValue,
                      }}
                    />

                    <div className=" bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-lg max-w-xs">
                      <img
                        src={message?.fileUrl}
                        alt="Profile"
                        className=" max-w-40 rounded-lg"
                      />
                      <span className="text-xs text-gray-400 float-end scale-95">
                        10:05
                      </span>
                    </div>
                  </div>
                )}

                {message.type === "file" && (
                  <div className="flex justify-end space-x-3 items-center ">
                    <DropDown
                      {...{
                        type: "file",
                        isOpenDropDown,
                        setIsOpenDropDown,
                        message,
                        index,
                        toggleDropDown,
                        DropDownValue,
                      }}
                    />

                    <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-lg max-w-xs">
                      <div className="flex flex-row p-2 bg-white rounded-md dark:bg-gray-800">
                        <i className="fa-solid fa-file text-purple-400 text-4xl mr-3"></i>
                        <p className="text-gray-600 dark:text-white">
                          {message.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-200 float-end scale-95">
                        10:05
                      </span>
                    </div>
                  </div>
                )}
                {message.type === "pdf" && (
                  <div className="flex justify-end space-x-3 items-center">
                    <DropDown
                      {...{
                        type: "pdf",
                        isOpenDropDown,
                        setIsOpenDropDown,
                        message,
                        index,
                        toggleDropDown,
                        DropDownValue,
                      }}
                    />

                    <div className="bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-lg max-w-xs">
                      <div className="flex flex-row p-2 bg-white rounded-md dark:bg-gray-800">
                        <i className="fa-solid fa-file-pdf text-3xl mr-2 text-red-600"></i>
                        <p>{message.message}</p>
                      </div>
                      <span className="text-xs text-gray-200 float-end scale-95">
                        10:05
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {/* Add more messages */}
    </div>
  );
};

export default ChatMessages;
