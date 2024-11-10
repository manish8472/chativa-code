import React, { useEffect, useRef, useState } from "react";
import ProfileIconLeftVertical from "../Sidebar/profile/ProfileIconLeftVetical";
import ThemeChangeButton from "../../theme/ChangeButton";

const LeftVerticalSidebar = ({
  isRecentContactOpen,
  setIsRecentContactOpen,
  openSettings,
  setOpenSettings,
  openContacts,
  setOpenContacts,
  isChatOpen,
}) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const toggleChat = (e) => {
    e.preventDefault();
    setIsRecentContactOpen(true);
    setOpenSettings(false);
    setOpenContacts(false);
  };
  const toggleSettings = (e) => {
    e.preventDefault();
    setIsRecentContactOpen(false);
    setOpenSettings(true);
    setOpenContacts(false);
  };
  const toggleContacts = (e) => {
    e.preventDefault();
    setIsRecentContactOpen(false);
    setOpenSettings(false);
    setOpenContacts(true);
  };

  const toggleDropDown = (e) => {
    e.preventDefault();
    setIsOpenDropDown(!isOpenDropDown);
  };

   const dropdownRef = useRef(null);
   useEffect(() => {
     const handleClickOutside = (event) => {
       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setIsOpenDropDown(false);
       }
     };
     document.addEventListener("mousedown", handleClickOutside);
     return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 m-0 border-t md:border-t-0 dark:border-gray-600
        md:relative md:w-20 md:h-screen
        w-full md:flex-col flex-row 
        items-center justify-around 
        md:left-auto
        fixed bottom-0 left-0
        z-10 transition-transform duration-300 ${
          isChatOpen ? "hidden md:flex" : "flex"
        }`}
    >
      {/* Chat Icon */}
      <div className="hover:bg-slate-50 dark:hover:bg-gray-800 relative group">
        <p className="absolute invisible left-0 bottom-11 p-1 bg-gray-500 text-sm text-white rounded-md group-hover:visible">
          Chat
        </p>
        <i
          className={`fas fa-comment-dots p-4 text-gray-400 m-0 ${
            isRecentContactOpen && "bg-fuchsia-50 dark:bg-gray-700 "
          } `}
          onClick={toggleChat}
        ></i>{" "}
      </div>
      {/* Contacts Icon */}
      <div className="hover:bg-slate-50 relative group hover:dark:bg-gray-800">
        <p className="absolute invisible left-0 bottom-11 p-1 bg-gray-500 text-sm text-white rounded-md group-hover:visible">
          Contacts
        </p>
        <i className={`bi bi-person-lines-fill text-gray-400 p-4 m-0 text-lg ${
            openContacts && "bg-fuchsia-50 dark:bg-gray-700 "
          } `}
          onClick={toggleContacts}></i>
        {/* <i
          className={`fas fa-users text-gray-400 p-4 m-0 ${
            openContacts && "bg-fuchsia-50 dark:bg-gray-700 "
          } `}
          onClick={toggleContacts}
        ></i> */}
      </div>
      {/* Settings Icon */}
      <div className="hover:bg-slate-50 relative group hover:dark:bg-gray-800">
        <p className="absolute invisible left-0 bottom-11 p-1 bg-gray-500 text-sm text-white rounded-md group-hover:visible">
          Setting
        </p>
        <i
          className={`fa-solid fa-gear text-gray-400 p-4 m-0 ${
            openSettings && "bg-fuchsia-50 dark:bg-gray-700 "
          } `}
          onClick={toggleSettings}
        ></i>
      </div>
      {/* Dark or Light Mode Icon */}
      <div className="hidden md:block">
        <ThemeChangeButton />
      </div>
      {/* Profile Icon */}
      <div className="relative" ref={dropdownRef}>
        <i
          className="fa-regular fa-user text-gray-400 p-4 m-0"
          onClick={toggleDropDown}
        ></i>
        <ProfileIconLeftVertical
          {...{ isOpenDropDown, setIsOpenDropDown, toggleSettings }}
        />
      </div>
    </div>
  );
};

export default LeftVerticalSidebar;
