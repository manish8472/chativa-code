import { useEffect, useRef } from "react";

const useClickOutside = (callback) => {
  const ref = useRef(null);

  // Call the callback if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(); // Execute the callback if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return ref;
};

export default useClickOutside;
