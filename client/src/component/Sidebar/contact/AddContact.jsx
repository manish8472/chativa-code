
import React, { useState } from "react";
import api from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

const AddContactModal = ({
  addContactModalVisible,
  setAddContactModalVisible,
}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const userId = JSON.parse(localStorage.getItem("currentUser")).userId;
  
  // Prevent rendering if modal is not visible
  if (!addContactModalVisible) return null;

  const handleInviteClick = async (e) => {
    e.preventDefault();

    // add contact logic here
    try {
      const res = await api.post("/contact/add", {
        userId: userId,
        email: email,
        name: name,
      });
      console.log(res);
      setEmail("");
      setName("");
      setAddContactModalVisible(false);
      window.location.reload();
    } catch (err) {
      if (err.status === 400) {
        console.log("User already in contact list");
      }
      console.log(err);
    }
    onClose(); // Close the modal after inviting
  };

  const onClose = () => {
    setAddContactModalVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-700 dark:text-white">
      <div className="bg-white p-6 rounded-lg w-96 dark:bg-gray-800 ">
        <h2 className="text-xl font-semibold mb-4">Add Contact</h2>
        {/* Email Input */}
        <form onSubmit={handleInviteClick}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-500"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Name
            </label>
            <input
              type="name"
              id="name"
              className="w-full mt-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-500"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;

