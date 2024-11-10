import React, { useState } from 'react'
import api from '../../../utils/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../app/slice/UserProfile';

const EditInfo = ({ isPersonalInfoOpen, setIsPersonalInfoOpen }) => {
  
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");
  const dispatch = useDispatch();

  if (!isPersonalInfoOpen) return null;
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/profile/update", {
        userId: user.userId,
        name,
        location,
        bio
      });
      alert(response.data.message);
      const { updatedProfile } = response.data;
      dispatch(setUser(updatedProfile));
      localStorage.setItem("currentUser", JSON.stringify(updatedProfile));
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
    setIsPersonalInfoOpen(false);
  };

  const onClose = () => {
    setIsPersonalInfoOpen(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-ms text-gray-700 dark:text-white">
      <div className="bg-white p-6 rounded-lg w-96 dark:bg-gray-800 ">
        <h2 className="text-xl font-semibold mb-4">Edit Personal Info</h2>
        {/* Email Input */}
        <form className="flex flex-col" onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              id="email"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-2 border rounded focus:outline-none dark:bg-slate-700 dark:border-gray-500"
              placeholder="Enter Name..."
            />
          </div>

          {/* Location Change */}
          <div className="mb-4">
            <label htmlFor="text" className="block  font-medium">
              Location
            </label>
            <input
              type="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-2 p-2 border rounded focus:outline-none dark:bg-slate-700 dark:border-gray-500"
              placeholder="Enter Location..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block  font-medium">
              Bio
            </label>
            <input
              type="bio"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full mt-2 p-2 border rounded focus:outline-none dark:bg-slate-700 dark:border-gray-500"
              placeholder="Enter Bio..."
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInfo
