import React, { useEffect, useState } from 'react'
import profile from '../../../assets/profile.png'
import { useSelector } from 'react-redux';
import api from '../../../utils/axios';

const ProfilePage = (props) => {
 const {profileOpen, setProfileOpen, user } = props


 const [profileInfo, setProfileInfo] = useState({});
 

 const toggleProfile = (e) => {
   e.preventDefault();
   setProfileOpen(!profileOpen);
 };

  const userId = useSelector((state) => state.chatuser.participants).receiver.userId;

  const findProfile = async () => {
    try{
        if(userId){
          const profile = await api.post("/profile/get", { userId });
          console.log(profile.data);
          setProfileInfo(profile.data);
        }
        
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() => {
    findProfile();
  },[userId]);

   if (!profileOpen) return null;
 

  return (
    <div
      className={` flex flex-col fixed right-0 z-50 transform  w-full md:w-80 h-screen bg-fuchsia-50 p-5 transition-transform duration-1000 ease-in-out border-l dark:bg-gray-800 dark:text-white dark:border-gray-600`}
    >
      <div className="flex flex-row-reverse m-4" onClick={toggleProfile}>
        <i className="fa-solid fa-xmark text-xl"></i>
      </div>
      <div className="flex items-center flex-col border-b p-4 dark:border-gray-500">
        <div>
          <img
            src={profileInfo?.profilePic || profile}
            alt="Profile"
            className="h-16 w-16 rounded-full"
          />
        </div>
        <h1 className="text-xl font-semibold mb-4">{profileInfo?.name}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {profileInfo?.bio}
          {/* Life is all about creating yourself, not discovering yourself. 🎨 */}
        </p>
      </div>

      <div className="my-6 text-sm">
        <h4 className="font-semibold text-lg">Personal Info</h4>
        <div className="bg-white p-4 rounded-lg shadow-md mt-2 dark:bg-gray-700">
          <div className="flex flex-col mb-2 pb-2 border-b border-gray-100 dark:border-gray-500">
            <span className="font-semibold pb-1">Name</span>
            <span className="text-gray-500 dark:text-gray-400">
              {profileInfo?.name}
            </span>
          </div>
          <div className="flex flex-col mb-2 pb-2 border-b border-gray-100 dark:border-gray-500">
            <span className="font-semibold pb-1">Email</span>
            <span className=" text-gray-500 dark:text-gray-400 ">
              {user.email}
            </span>
          </div>
          <div className="flex flex-col mb-2 pb-2 border-b border-gray-100 dark:border-gray-500">
            <span className="font-semibold pb-1">Location</span>
            <span className=" text-gray-500 dark:text-gray-400 ">
              {profileInfo?.location}
            </span>
          </div>

          {/* <div className="flex flex-col mb-2">
            <span className="font-semibold ">Location</span>
            <span className=" text-gray-500 dark:text-gray-400 pb-1 ">
              Patna, India
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage
