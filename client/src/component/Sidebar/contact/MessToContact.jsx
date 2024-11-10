import React from 'react'
import api from '../../../utils/axios';
import { socket } from '../../../socket/socket';
import { useSelector } from 'react-redux';

const MessToContact = ({
  sendMessageModalVisible,
  setSendMessageModalVisible,
  contact,
}) => {
  if(!sendMessageModalVisible) return null
  const [invitationMessage, setInvitationMessage] = React.useState("");

  const userId = JSON.parse(localStorage.getItem("currentUser")).userId;
  const receiverId = useSelector((state) => state.chatuser?.participants).receiver.userId;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(userId, contact.email,contact.name, invitationMessage);

    // add contact logic here
    try{
      const res = await api.post("/invitation/message", {
        userId: userId,
        email: contact.email,
        message: invitationMessage,
        name: contact.name,
      });
      const {message, conversationId} = (res.data);
      const msg = {
        message:message.message,
        type:message.type,
        timestamp: message.timestamp,
        fileUrl: message?.fileUrl,
        conversationId: conversationId,
        senderId: userId,
        receiverId: receiverId,
      }
      socket.emit("sendMessage", msg);
      setInvitationMessage("");
      window.location.reload();
    }
    catch(err){
      if(err.status === 400){
        console.log("User already in contact list");
      }
      console.log(err)
    }
    setSendMessageModalVisible(false); // Close the modal after inviting
  };

  const onClose = () => {
    setSendMessageModalVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-700 dark:text-white">
      <div className="bg-white p-6 rounded-lg w-96 dark:bg-gray-800 ">
        <h2 className="text-xl font-semibold mb-4">Send Message</h2>
        {/* Email Input */}
        <form onSubmit={handleSendMessage}>
          {/* Invitation Message Input */}
          <div className="mb-4">
            <label htmlFor="invitationMessage" className="block font-medium">
               Message
            </label>
            <textarea
              id="invitationMessage"
              className="w-full mt-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-500"
              placeholder="Enter Message"
              value={invitationMessage}
              onChange={(e) => setInvitationMessage(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Modal Buttons */}
          <div className="flex justify-end space-x-4">
            {/* Close Button */}
            <button
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600"
              onClick={onClose}
            >
              Close
            </button>
            {/* Invite Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessToContact
