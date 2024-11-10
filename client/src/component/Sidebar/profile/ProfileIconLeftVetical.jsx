import React from "react";
import ThemeChangeButton from "../../../theme/ChangeButton";
import { useDispatch } from "react-redux";
import { removeAuth } from "../../../app/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../socket/socket";

const ProfileIconLeftVertical = ({
  isOpenDropDown,
  setIsOpenDropDown,
  toggleSettings,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const openSettings = (e) =>{
    e.preventDefault();
    setIsOpenDropDown(false);
    toggleSettings(e);
  }

  const handleLogout = () =>{

    socket.disconnect();
    dispatch(removeAuth());
    localStorage.removeItem('currentUser');
    navigate('./signin');
  }
  if (!isOpenDropDown) return null;
  
  return (
    <div className="relative">
      {/* Dropdown menu */}
      {isOpenDropDown && (
        <div className="absolute right-0 bottom-12 md:left-12 md:bottom-0 py-2  mt-2 w-36  text-sm bg-white border rounded-lg shadow-lg text-gray-600 dark:bg-gray-800 dark:text-white dark:border-gray-500 dark:shadow-gray-600">
          <ul>
            <li className="flex  md:hidden items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700">
              <ThemeChangeButton />
            </li>
            {/* <li
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
              onClick={openSettings}
            >
              <div className="">Settings</div>
              <i className="fa-solid fa-gear"></i>
            </li> */}
            <li
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
              onClick={openSettings}
            >
              Profile
              <i className="fa-regular fa-user"></i>
            </li>
            <li
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
              onClick={handleLogout}
            >
              Logout
              <i className="fa-solid fa-power-off"></i>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileIconLeftVertical;
