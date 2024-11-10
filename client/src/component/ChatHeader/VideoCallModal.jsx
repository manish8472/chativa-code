import React from "react";
import profile from "../../assets/profile.png";


const VideoCallModal = ({ user, isVisible, onClose}) => {
  if (!isVisible) return null; // Don't render if modal is not visible

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-fuchsia-100 rounded-lg p-6 w-full max-w-96 h-full max-h-96 flex flex-col items-center dark:bg-gray-700 dark:text-white">
        {/* Profile Picture */}
        <p className="pb-3 text-red-500 dark:text-yellow-400 font-semibold">
          ⚠️Video calling function not available!
        </p>
        <img
          src={user.profileUrl || profile}
          alt={user.name}
          className="w-24 h-24 rounded-full mb-4"
        />
        {/* User Name */}
        <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
        {/* Call Message */}
        <p className="text-gray-500 mb-6 dark:text-gray-400">
          Start Video Call
        </p>

        {/* Call Control Buttons */}
        <div className="flex flex-col-reverse h-full">
          {/* Cancel Call */}
          <div className="flex space-x-12">
            <button
              className="bg-red-500 text-white  rounded-full hover:bg-red-600 focus:outline-none"
              onClick={onClose}
            >
              <i className="fas fa-times text-xl px-5"></i>
            </button>

            {/* Accept Call */}
            <button className="bg-green-500 text-white  rounded-full hover:bg-green-600 focus:outline-none">
              <i className="fas fa-video p-5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
