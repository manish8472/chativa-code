
import React, { useEffect, useRef, useState } from 'react'
import useClickOutside from '../../Hooks/ClickOutside';
import ForwardTo from '../ForwardTo';
import api from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setChatMessages } from '../../app/slice/MessageSlice';
import { downloadMedia } from '../../methods/methods';

const DropDown = ({type, isOpenDropDown, setIsOpenDropDown, index, message, toggleDropDown, 
  DropDownValue}) => {
    const [isForwandOpen, setIsForwandOpen] = useState(false);
    const [positionX, setPositionX] = useState("left-0");
    const [postionY, setPositionY] = useState("top-full");
    const [copySuccess, setCopySuccess] = useState("");

    const dispatch = useDispatch();

    const openForwand = () => {
      setIsForwandOpen(true);
    };

    const isText = type === "text";

    const closeDropDown = () => {
      setIsOpenDropDown(false);
    };

    const reference = useClickOutside(closeDropDown);

    const dropdownRef = useRef(null);

    useEffect(() => {
      if (dropdownRef.current && isOpenDropDown) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (rect.right > viewportWidth / 2) {
          setPositionX("right-5");
        } else {
          setPositionX("left-5");
        }

        if (rect.bottom < viewportHeight / 2) {
          setPositionY("top-0");
        } else {
          setPositionY("bottom-0");
        }
      }
    }, [isOpenDropDown]);

    // To copy text to clipboard
    const copyText = (text) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopySuccess("Copied!"); // Show success message when copy is successful
          setTimeout(() => setCopySuccess(""), 1000); // Reset message after 1 seconds
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Error copying text to clipboard: ", err);
        });
    };

     let conversationId = useSelector(
       (state) => state.chatuser.participants.receiver.conversationId
     );

   let messages = useSelector((state) => state.message.message);
   messages = messages.filter((msg) => msg !== message);

    const handleDelete = async () => {
      const messageId = message._id;
      try {
        // Make the DELETE request to the backend
        const response = await api.delete(
          `/deleteMessage/${conversationId}/${messageId}`
        );

        if (response.status === 200) {
          // Notify parent component or handle success (e.g., removing the message from the UI)
          alert("Message deleted successfully");
        }
        dispatch(setChatMessages(messages));
        closeDropDown();
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message. Try again.");
      }
    };

    let chatUserId = useSelector(
      (state) => state.chatuser.participants.receiver.userId
    );

    const handleDonwload = (e) =>{
      e.preventDefault();
      downloadMedia(message);
    }

    return (
      <div className="relative" ref={dropdownRef}>
        {DropDownValue === index && isOpenDropDown && (
          <div
            className={`absolute ${positionX} ${postionY} w-36 py-2 bg-gray-50 z-10 border rounded-lg shadow-lg text-sm text-gray-600 dark:text-white dark:bg-gray-800 dark:border-gray-500 dark:shadow-gray-700`}
            ref={reference}
          >
            <ul>
              {/* for text message */}
              {/* {copySuccess && (
                <li className="text-sm text-yellow-500 p-2 font-semibold text-center">
                  {copySuccess}
                </li>
              )} */}

              {isText && (
                <>
                  <li
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                    onClick={copyText.bind(null, message.message)}
                  >
                    {copySuccess && (
                      <div className="text-center font-bold text-yellow-600 dark:text-yellow-300">
                        {copySuccess}
                      </div>
                    )}
                    {!copySuccess && (
                      <>
                        <div>Copy</div>
                        <i className="fa-regular fa-copy "></i>{" "}
                      </>
                    )}
                  </li>
                </>
              )}
              {!isText && (
                <li
                  onClick={(e) => handleDonwload(e) }
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                >
                  <div>Download</div>
                  <i className="fa-solid fa-arrow-down"></i>
                </li>
              )}

              <li
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                onClick={openForwand}
              >
                <div>Forward</div>
                <i className="fa-solid fa-share"></i>
              </li>
              <li
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                onClick={handleDelete}
              >
                <div>Delete</div>
                <i className="fa-regular fa-trash-can"></i>
              </li>
            </ul>
          </div>
        )}
        <i
          className="fa-solid fa-ellipsis-vertical text-gray-400 p-2"
          onClick={() => toggleDropDown(index)}
        ></i>

        <ForwardTo
          {...{
            isForwandOpen,
            setIsForwandOpen,
            message: message.message,
            chatUserId,
          }}
        />
      </div>
    );
  }
export default DropDown

