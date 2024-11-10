import React, { useEffect, useRef , useState} from "react";
import { useSelector } from "react-redux";
import api from "../../utils/axios";
import DeleteChat from "./DeleteChat";

const ChatHeaderIconDropDown = ({
  isOpenDropDown,
  setIsOpenDropDown,
  setProfileOpen,
}) => {
  
  const [deleteContatModalVisible, setDeleteContatModalVisible] = useState(false);

  const openProfile = () => {
    setIsOpenDropDown(false);
    setProfileOpen(true);
  };

  const openDeleteContactModal = () => {
    setDeleteContatModalVisible(!deleteContatModalVisible);
  };

  // userId and coversationId from redux state chatuser
  const receiver = useSelector((state) => state.chatuser.participants);

   if (!isOpenDropDown) return null;
  
  const handleDelete = async () => {
    const userId = receiver.userId;
    const conversationId = receiver.receiver.conversationId;
    try {
      const response = await api.delete("/chatcontact/delete", {
        data: { userId, conversationId },
      });

      if (response.status === 200) {
        // Update the contact list in state
        // const updatedContacts = contacts.filter(
        //   (contact) => contact.conversationId !== conversationId
        // );
        // setContacts(updatedContacts); // Update the contacts in state
        console.log("Contact deleted:", response.data);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
 

  return (
    <div className="relative">
      {/* Dropdown menu */}
      {isOpenDropDown && (
        <div className="absolute right-4 mt-4 w-36 py-2 z-30 bg-fuchsia-50 border rounded-lg shadow-lg text-sm text-gray-600 dark:bg-gray-800 dark:border-gray-500 dark:shadow-gray-700 dark:text-white">
          <ul>
            <li
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
              onClick={openProfile}
            >
              {/* <FontAwesomeIcon
                icon={faArchive}
                className="mr-2 text-gray-500"
              /> */}
              View Profile
              <i className="fa-regular fa-user"></i>
            </li>
            {/* <li className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700">
              <div>Block</div>
              <i class="fa-solid fa-ban"></i>
            </li> */}
            <li className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
            onClick={openDeleteContactModal}
            >
              {/* <FontAwesomeIcon icon={faTrash} className="mr-2 text-gray-500" /> */}
              Delete
              <i className="fa-regular fa-trash-can"></i>
            </li>
          </ul>
        </div>
      )}

      <DeleteChat
        {...{ deleteContatModalVisible, setDeleteContatModalVisible }}
      />
    </div>
  );
};

export default ChatHeaderIconDropDown;
