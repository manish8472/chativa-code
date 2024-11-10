import React from 'react'
import { emojis } from '../../Data/Emoji'
import useClickOutside from '../../Hooks/ClickOutside';

const Emoji = ({isEmojiOpen, setIsEmojiOpen, setMessageText}) => {
  if (!isEmojiOpen) return null;

  const handleEmojiClick = (emoji) => {
    setMessageText((prev) => prev + emoji);
  };

  const closeEmojiDropdown = () => {
    setIsEmojiOpen(false);
  };

  // for  Emoji dorpdown close when clicked outside of dropdown
  const dropdownRef = useClickOutside(closeEmojiDropdown);

  return (
    <div className="absolute left-6 bottom-12 flex h-auto w-60 max-h-36  sm:w-96 bg-fuchsia-100 overflow-hidden text-2xl shadow-xl p-2 rounded-md overflow-y-auto dark:bg-gray-800"
      ref={dropdownRef}
      >
      <div className="flex flex-wrap ">
        {emojis.map((emoji) => (
          <div
            key={emoji.id}
            className="hover:bg-fuchsia-200"
            onClick={() => handleEmojiClick(emoji.emoji)}
          >
            {emoji.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Emoji
