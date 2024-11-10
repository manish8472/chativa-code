import React from "react";
import { Link } from "react-router-dom";
import LogoName from "../component/LogoName";

const ResetPassword = () => {
  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-fuchsia-50 dark:bg-gray-900 dark:text-white">
      <LogoName />
      <div className="bg-white p-10 rounded-lg shadow-sm max-w-sm w-full dark:bg-gray-800">
        <div className="text-center text-red-700 font-bold">
          {" "}
          This section is under working!
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <p className="text-center text-gray-500 mb-8 dark:text-gray-300">
          Reset Password With Chativa.
        </p>

        {/* Success Message */}
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-6 text-center dark:bg-green-700 dark:text-gray-100">
          Enter your Email, Reset password link will be sent to you!
        </div>

        {/* Reset Password Form */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-white "
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md shadow-sm border-gray-300 focus:outline-none dark:bg-gray-900 dark:border-gray-500"
              placeholder="Enter Email"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
          >
            Reset
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 dark:text-gray-100">
          Remember It?{" "}
          <a
            href="#"
            className="text-indigo-500 hover:underline dark:text-indigo-300"
          >
            <Link to="/signin"> Sign in here</Link>
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
