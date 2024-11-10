import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils/axios';
import { setchatContactList } from '../../app/slice/ChatContactListSlice';

const DeleteChat = ({ deleteContatModalVisible, setDeleteContatModalVisible }) => {

    
    const receiver = useSelector((state) => state.chatuser.participants);
    let chatContacts = useSelector(
      (state) => state.chatcontact.chatContactList
    );
    const dispatch = useDispatch();
    if (!deleteContatModalVisible) return null;

    const handleDelete = async () => {
      const userId = receiver.userId;
      const conversationId = receiver.receiver.conversationId;
      try {
        const response = await api.delete("/chatcontact/delete", {
          data: { userId, conversationId },
        });

        if (response.status === 200) {
        //   Update the contact list in state
          const updatedContacts = chatContacts.filter(
            (contact) => contact.conversationId !== conversationId
          );
          dispatch(setchatContactList(updatedContacts)) // Update the contacts in state
          console.log("Contact deleted:", response.data);
        }
        window.location.reload();
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    };

 const onClose = () => {
   setDeleteContatModalVisible(false);
 } 

 const userInfo = receiver.receiver;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-fuchsia-50 rounded-lg p-6 w-full  max-w-96 flex flex-col  dark:bg-gray-700 dark:text-white">
        <h2 className="text-xl font-semibold pb-4 text-center">
          Delete Chat
        </h2>
        <h2 className="text-base font-semibold mb-2 text-gray-950 dark:text-gray-100 underline ">User Details:</h2>

        <div className="flex flex-col mb-2 pb-2 border-b border-gray-100 dark:border-gray-600">
          <span className="font-semibold pb-1">Name</span>
          <span className="text-gray-500 dark:text-gray-400 ">
            {userInfo?.name}
          </span>
        </div>
        <div className="flex flex-col mb-2 pb-2 border-b border-gray-100 dark:border-gray-600">
          <span className="font-semibold pb-1">Email</span>
          <span className=" text-gray-500 dark:text-gray-400">
            {userInfo?.email}
          </span>
        </div>
        <div className="py-4 text-red-300 ">
          {" "}
          This action will delete from recent chat list
        </div>
        <div className="flex justify-end space-x-4">
          {/* Close Button */}
          <button
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          {/* Invite Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteChat
