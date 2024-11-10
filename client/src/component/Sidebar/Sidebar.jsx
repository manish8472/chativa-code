import React, { useState } from "react";
import LogoName from "../LogoName";
import ChatContactList from "./chat/ChatContactList";




const Sidebar = ({ openChat, isChatOpen, userId, setParticipantsDetails }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div
      className={`bg-fuchsia-50 dark:bg-gray-800 dark:text-white w-full flex-col h-screen md:w-3/5 lg:w-2/5 p-4 border-x overflow-hidden border-gray-100 dark:border-gray-700 pb-16 md:pb-4 transition-transform duration-300 ${
        isChatOpen ? "hidden md:flex" : "flex"
      }`}
    >
      {/* Logo */}

      <LogoName />

      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full py-2 px-3 rounded-md border focus:outline-none bg-white dark:bg-gray-600 dark:border-none"
        />
      </div>

      {/* Recent Contacts */}
      <h3 className="text-xl font-semibold mb-3">Recent</h3>

      <div className="py-6 overflow-y-scroll flex-1">
        <ChatContactList
          {...{ searchText, openChat, userId, setParticipantsDetails }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
