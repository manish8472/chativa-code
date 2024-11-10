import React, {  useState } from "react";
import EditInfo from "./EditInfo";
import profile from "../../../assets/profile.png";
import api from "../../../utils/axios";
import { fileUpload } from "../../../routes/message";

const Settings = () => {
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState({})

  const EditPersonalInfo = () => {
    setIsPersonalInfoOpen(!isPersonalInfoOpen);
  };

  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  // console.log(userInfo);

  // useEffect(() => {
  //   const updateProfilePhoto = async () => {
  //     if (profilePhoto?.name) {
  //       if (file.size > 550000) {
  //         alert("Your can't upload profile photo size greater 500kb");
  //       } else {
  //         let data = new FormData();
  //         data.append("file", profilePhoto);
  //         data.append("name", profilePhoto?.name);
  //         const res = await fileUpload(data);
  //         const responce = await api.put('/profile/update/photo', {profileUrl: res, userId: userInfo.userId});
  //         console.log(responce.data);
  //       }
  //     }
  //     setProfilePhoto({});
  //   }

  //   updateProfilePhoto();
  // },[])

  const handleProfilePhoto = async (e) => {
    e.preventDefault();
    // setProfilePhoto(e.target.files[0]);
    const file = e.target.files[0];
    if (file.size > 550000) {
          alert("Your can't upload profile photo size greater 500kb");
        } else {
          let data = new FormData();
          data.append("file", file);
          data.append("name", file?.name);
          const res = await fileUpload(data);
          console.log(res);
          try{
            const responce = await api.put("/profile/update/photo", {
              profileUrl: res,
              userId: userInfo.userId,
            });

            const profile = await api.post("/profile/get", {userId: userInfo.userId});
            localStorage.setItem("currentUser", JSON.stringify(profile.data));
            console.log(responce.data);
          }catch(error){
            console.log(error);
          }
        }
        window.location.reload();
  }

  return (
    <>
      <div className="bg-fuchsia-50 w-full h-screen md:w-3/5 lg:w-2/5 p-4 pb-16 overflow-scroll md:pb-4 border-x border-gray-100  dark:bg-gray-800 dark:border-gray-700 dark:text-white ">
        <div className="flex flex-col items-center">
          {/* Profile Section */}
          <div className="relative">
            <img
              className="w-20 h-20 rounded-full"
              src={userInfo?.profilePic || profile}
              alt="Profile"
            />

            <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-600 py-1 px-2 rounded-full">
              <label htmlFor="profilepic">
                <i className="fas fa-pencil-alt"></i> {/* Edit icon */}
              </label>
            </button>
            <input
              type="file"
              id="profilepic"
              className="hidden"
              onChange={(e) => handleProfilePhoto(e)}
            />
          </div>
          <h3 className="text-lg font-semibold mt-2">{userInfo?.username}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo?.bio}
          </span>
        </div>

        {/* Personal Info Section */}
        <div className="mt-6 text-sm">
          <h4 className="font-semibold text-lg">Personal Info</h4>
          <div className="bg-white p-4 rounded-lg shadow-md mt-2  dark:bg-gray-700 ">
            <div className="flex flex-row-reverse">
              <span
                className="font-semibold text-blue-500 float-right mb-2 cursor-pointer"
                onClick={EditPersonalInfo}
              >
                ✏️Edit
              </span>
            </div>
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

            <div className="flex flex-col mb-2">
              <span className="font-semibold ">Location</span>
              <span className=" text-gray-500 pb-1 dark:text-gray-400">
                {userInfo?.location || "Unknown"}
              </span>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="mt-4 text-sm">
          <h4 className="font-semibold text-lg">Privacy</h4>
          <div className="bg-white p-4 rounded-lg shadow-md mt-2 dark:bg-gray-700">
            <p className="text-red-500 text-center">
              {" "}
              Currentaly this section is not working
            </p>
            <div className="flex justify-between items-center flex-col">
              <div className="flex flex-col w-full ">
                {/* Profile Photo */}
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-600">
                  <span>Profile photo</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none bg-fuchsia-50 dark:text-white dark:bg-gray-800 dark:border-none">
                    <option>Everyone</option>
                    <option>Contacts</option>
                    <option>Nobody</option>
                  </select>
                </div>

                {/* Last Seen */}
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-600">
                  <span>Last seen</span>
                  <label className="switch ">
                    <input type="checkbox" className="toggle-checkbox " />
                    <span className="toggle-slider round "></span>
                  </label>
                </div>

                {/* Status */}
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-600">
                  <span>Status</span>
                  <select className="bg-fuchsia-50 border border-gray-300 rounded px-2 py-1  focus:outline-none dark:bg-gray-800 dark:border-none">
                    <option>Everyone</option>
                    <option>Contacts</option>
                    <option>Nobody</option>
                  </select>
                </div>

                {/* Read Receipts */}
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-600">
                  <span>Read receipts</span>
                  <label className="switch">
                    <input type="checkbox" className="toggle-checkbox" />
                    <span className="toggle-slider round"></span>
                  </label>
                </div>

                {/* Groups */}
                <div className="flex justify-between items-center py-3 ">
                  <span>Groups</span>
                  <select className="bg-fuchsia-50 border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none dark:text-white dark:bg-gray-800 dark:border-none">
                    <option>Everyone</option>
                    <option>Contacts</option>
                    <option>Nobody</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditInfo {...{ isPersonalInfoOpen, setIsPersonalInfoOpen }} />
    </>
  );
};

export default Settings;
