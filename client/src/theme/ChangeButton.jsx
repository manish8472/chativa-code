import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext';

const ThemeChangeButton = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className=" relative group">
      <p className="absolute invisible left-0 bottom-11 p-1 bg-gray-500 text-sm text-white rounded-md group-hover:visible hidden md:block">
        Change Theme
      </p>
      <div className="flex flex-row justify-between">
         
        {darkMode ? (
          <i
            className="bi bi-moon text-lg text-gray-400 dark:text-white "
            onClick={toggleDarkMode}
          ></i>
        ) : (
          <div>
            <i
              className="bi bi-brightness-high text-lg text-gray-400 dark:text-white"
              onClick={toggleDarkMode}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThemeChangeButton
