import React, { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white text-gray-800 text-lg font-semibold"
      >
        {title}
        <span>
          {isOpen ? (
            <i class="fa-solid fa-chevron-up"></i>
          ) : (
            <i class="fa-solid fa-chevron-down"></i>
          )}
        </span>
      </button>
      {isOpen && <div className="p-4 bg-gray-50">{children}</div>}
    </div>
  );
};

export default Accordion;
