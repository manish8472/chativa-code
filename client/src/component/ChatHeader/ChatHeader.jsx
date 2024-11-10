import React, { useEffect, useRef, useState} from "react";
import profile from "../../assets/profile.png";
import ProfilePage from "../Sidebar/profile/ProfilePage";
import AudioCallModal from "./AudioCallModal";
import VideoCallModal from "./VideoCallModal";
import ChatHeaderIconDropDown from "./ChatHeaderIcon";
import { useSelector } from "react-redux";
import { reduceSize } from "../../methods/methods";
import { socket } from "../../socket/socket";


const ChatHeader = ({ closeChat }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAudioCallModalVisible, setIsAudioCallModalVisible] = useState(false);
  const [isVideoCallVisible, setIsVideoCallVisible] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const openAudioCallModal = () => {
    setIsAudioCallModalVisible(true);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };
  const handleVideoCallClick = () => {
    setIsVideoCallVisible(true);
  };

  const toggleDropDown = (e) => {
    e.preventDefault();
    setIsOpenDropDown(!isOpenDropDown);
  };

  const user = {
    name: "Amit Singh",
    profile: profile,
  };

  // for dorpdown close when clicked outside of dropdown
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

  // find value from react-redux store of chat participants
  const { receiver } = useSelector((state) => state.chatuser?.participants);
  

  // Header Name size is greater that 30 characters then it will be truncated

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // find active users
  const activeUsers = useSelector((state) => state?.activeUsers?.users);

  // senseAudioCall({userId: currentUser.userId, userToCall: receiver.userId});

   socket.on("incomingCall", (data) => {
     openAudioCallModal();
     console.log(data);
   });
  
  return (
    <>
      <div className="flex justify-between items-center p-4 border-b bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700">
        <div className="flex items-center px-1">
          <button
            onClick={closeChat}
            className="md:hidden text-xl mr-4 cursor-pointer"
          >
            <i className="fas fa-arrow-left"></i> {/* Font Awesome Back Icon */}
          </button>
          <div className="flex flex-row cursor-pointer" onClick={toggleProfile}>
            <img src={receiver?.profileUrl || profile} alt="profile" className="h-10 w-10 rounded-full" />
            <div className="ml-2">
              <p className="font-semibold">{reduceSize(receiver?.name, 30)}</p>
              <p className="text-sm text-green-500">{activeUsers?.find(user => user.userId == receiver?.userId) ? "Online" : "Ofline"}</p>
            </div>
          </div>
        </div>

        {/* Chat Options */}
        <div className="flex space-x-4 flex-row text-gray-500 dark:text-gray-300">
          <i className="fas fa-phone  " onClick={openAudioCallModal}></i>
          <i
            className="fas fa-video  px-2"
            onClick={handleVideoCallClick}
          ></i>
          <div className="flex items-center justify-center" ref={dropdownRef}>
            <i
              className="fa-solid fa-ellipsis-vertical  px-2"
              onClick={toggleDropDown}
            ></i>
            <ChatHeaderIconDropDown
              {...{ isOpenDropDown, setIsOpenDropDown, setProfileOpen }}
            />
          </div>
        </div>
      </div>

      {/* Profile Page */}

      <ProfilePage
      {...{user:receiver, profileOpen, setProfileOpen}}
      />

      {/* Audio Call Modal */}
      <AudioCallModal
        {...{ user:receiver, isAudioCallModalVisible, setIsAudioCallModalVisible }}
      />

      {/* Video Call Modal */}
      {
        <VideoCallModal
          {...{
            user: receiver,
            isVisible: isVideoCallVisible,
            onClose: () => setIsVideoCallVisible(false),
          }}
        />
      }
    </>
  );
};

export default ChatHeader;
