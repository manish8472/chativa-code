import React, { useState } from "react";
import ForwardTo from "../../ForwardTo";
import useClickOutside from "../../../Hooks/ClickOutside";
import api from "../../../utils/axios";
import MessToContact from "./MessToContact";

const DropDown = ({
  isOpenDropDown,
  setIsOpenDropDown,
  contact,
}) => {
 
  const [isForwandOpen, setIsForwandOpen] = useState(false);
  const [sendMessageModalVisible, setSendMessageModalVisible] = useState(false);
   const openForwand = () => {
     setIsForwandOpen(true);
   };

   if (!isOpenDropDown) return null; 

   const openSendMessageModal = () => {
    setSendMessageModalVisible(!sendMessageModalVisible);
  };

    const closeDropDown = () => {
      setIsOpenDropDown(false);
    }

    const dropdownRef = useClickOutside(closeDropDown);

    // send message when clicked on forward
    let message = contact.email;
    message += " " + contact.name;

    const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;

    const handleDelete = async (contactId) => {
      try {
        const response = await api.delete(
          `/contact/delete/${userId}/${contactId}`
        );
        window.location.reload();
        console.log("Contact deleted:", response.data);
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    };
    
    // For filtering chatcontact when showing in forward Message page
    let chatUserId = contact.contactId;

    console.log(chatUserId)

    // chatuser.participants.receiver.userId;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown menu */}
      {isOpenDropDown && (
        <div className="absolute right-4 to w-36 py-2 bg-fuchsia-50 border rounded-lg shadow-lg text-sm text-gray-600 dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <ul>
            <li className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700" 
            onClick={openSendMessageModal}
            >
              message
              <i className="bi bi-chat-dots text-gray-800 dark:text-white"></i>
            </li>
            <li
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
              onClick={openForwand}
            >
              share
              <i className="bi bi-share text-gray-800 dark:text-white"></i>
            </li>
            {/* <li className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700">
              <div>Block</div>
              <i class="fa-solid fa-ban"></i>
            </li> */}
            <li
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
              onClick={() => handleDelete(contact.contactId)}
            >
              {/* <FontAwesomeIcon icon={faTrash} className="mr-2 text-gray-500" /> */}
              Delete
              <i className="fa-regular fa-trash-can"></i>
            </li>
          </ul>
        </div>
      )}
      <ForwardTo {...{ isForwandOpen, setIsForwandOpen, message, chatUserId }} />
      <MessToContact
        {...{ sendMessageModalVisible, setSendMessageModalVisible, contact }}
      />
    </div>
  );
};

export default DropDown;
