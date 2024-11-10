
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoName from "../component/LogoName";
import api from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/slice/UserProfile";
import { socket } from "../socket/socket";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

   

    const handleLogin = async(e)=>{
        e.preventDefault();        

        const user = {email, password};
        console.log(email, password);
        try {
          const res = await api.post("/auth/signin", user);
         
          // console.log(res.data);
          const { token, userProfile } = res.data;
          console.log(userProfile);
          dispatch(setUser({ userProfile}));

          const currentUser = {
            token:token,
            username:userProfile.name,
            email:userProfile.email,
            userId:userProfile.userId,
            profilePic:"",
            location:userProfile?.location,
            bio:userProfile?.bio,
          }
          
          // set data in local storage
          localStorage.setItem("currentUser", JSON.stringify(userProfile));
          // localStorage.setItem("token", JSON.stringify(token));
          
          socket.connect();
          socket.emit("add-user", JSON.stringify(userProfile));
          
          // After Login go to Chat Page
          navigate("/");
          
        } catch (err) {
           if (err.status === 401) setError("Invalid Email or Password");
           else if (err.status === 404) setError("User Not Found");
           else if (!err.status) setError("Network Error");
           else if (err.status !== 200) setError("Something went wrong");

           // remove Error message after 3 seconds
           setTimeout(() => {
             setError("");
           }, 3000);
          console.error(err);
        }
       
       
    }
  return (
    <div className="flex items-center flex-col justify-center min-h-screen pt-4 py-6 bg-fuchsia-50 dark:bg-gray-900">
      <LogoName />
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-sm dark:text-white dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">Sign in</h2>
          <p className="text-gray-500 dark:text-gray-300">
            Sign in to continue to Chativa.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                className="w-full px-3 py-2 mt-1 text-sm border rounded-md shadow-sm focus:outline-none border-gray-300 dark:bg-gray-900 dark:border-gray-500"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 mt-1 text-sm border rounded-md shadow-sm focus:outline-none border-gray-300 dark:bg-gray-900 dark:border-gray-500"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right">
                <div
                  href="#"
                  className="text-sm text-indigo-600 hover:underline dark:text-blue-400"
                >
                  <Link to="/reset-password"> Forgot password? </Link>
                </div>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 text-center">{error}</div>}

          {/* <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded "
            />
            <label
              htmlFor="remember-me"
              className="block ml-2 text-sm text-gray-900 dark:text-gray-200"
            >
              Remember me
            </label>
          </div> */}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="flex justify-center mt-6 text-sm">
          <div className="text-gray-600 dark:text-white">
            Don't have an account?{" "}
            <span
              href="#"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              <Link to="/signup">Signup now</Link>
            </span>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 text-gray-400 text-sm">
        // © 2024 Chativa. Crafted with ❤️ by Manish //{" "}
      </div>
    </div>
  );
};

export default LoginPage;

