import React, { useState , useEffect} from 'react'
import AddContact from './AddContact';
import DropDown from './DropDown';
import api from '../../../utils/axios';
import { reduceSize } from '../../../methods/methods';

const ContactList = ({ setReceiverUserDetails }) => {
  const [addContactModalVisible, setAddContactModalVisible] = useState(false);
  const [DropDownValue, setDropDownValue] = useState(-1);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [contacts, setContacts] = useState([]);
  

  const openAddContactModal = () => {
    setAddContactModalVisible(true);
  };

  const toggleDropDown = (id) => {
    if (id === DropDownValue) {
      setDropDownValue(-1);
      setIsOpenDropDown(false);
    } else {
      setDropDownValue(id);
      setIsOpenDropDown(true);
    }
  };

  const closeDropDown = () => {
    setIsOpenDropDown(false);
  };

  // console.log(contacts);
  const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Send POST request with userId in the request body
        const response = await api.post("/contact/get", { userId });
        setContacts(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
        // setError("Error fetching contact list");
      }
    };

    fetchContacts();
  }, [userId]);


  return (
    <>
      <div className="bg-fuchsia-50 w-full h-screen md:w-3/5 lg:w-2/5 p-4  border-x border-gray-100 overflow-y-hidden  md:pb-4 flex flex-col dark:bg-gray-800 dark:border-gray-700 dark:text-white ">
        <div className="flex justify-between items-center mb-6 text-gray-700 ">
          <h2 className="text-xl font-semibold text-gray-600 dark:text-white">
            Contact List
          </h2>
          <div className="relative group">
            <p className=" absolute invisible right-6 top-0 p-1 bg-gray-500 text-sm text-white rounded-md group-hover:visible">
              Add Contact
            </p>
            <i
              className="fa-solid fa-user-plus cursor-pointer text-blue-600"
              onClick={openAddContactModal}
            ></i>
          </div>
        </div>
        <div className="border-b dark:border-gray-600"></div>
        <div className="flex flex-col h-full items-center text-gray-500 dark:text-white overflow-y-scroll py-8">
          {contacts
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort contacts by name
            .map((contact, index) => (
              <div
                className="flex justify-between w-full my-2 p-2 hover:bg-fuchsia-100 rounded-md dark:hover:bg-gray-700"
                key={index}
              >
                <p>{reduceSize(contact.name)}</p>
                <div className="relative">
                  {DropDownValue === index && isOpenDropDown && (
                    <DropDown
                      {...{ isOpenDropDown, setIsOpenDropDown, contact}}
                    />
                  )}
                  <i
                    className="fa-solid fa-ellipsis-vertical  p-2"
                    onClick={() => toggleDropDown(index)}
                  ></i>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Add Contact Modal */}
      <AddContact {...{ addContactModalVisible, setAddContactModalVisible }} />
    </>
  );
};

export default ContactList
