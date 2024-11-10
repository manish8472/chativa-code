import { Link , useNavigate} from "react-router-dom";
import LogoName from "../component/LogoName";
import api from "../utils/axios";
import { useState } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = { email, username, password };

    console.log(user)
     try {
       const res = await api.post("/auth/signup", user);
       console.log(res);
       // Go go login page
       navigate("/singin");
     } catch (err) {
      if(err.status == 403) setError("Email already registered");
      else if (err.status !== 200) setError("Something went wrong");

      // remove Error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
      console.error(err.response.data);
     }

    

  }
  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-fuchsia-50 py-6 dark:bg-gray-900 dark:text-white">
      <LogoName />
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <div className="flex flex-col items-center ">
          {/* <img
            className="w-12 h-12 mb-4"
            src="https://cdn-icons-png.flaticon.com/512/6840/6840493.png" // You can replace this with your logo
            alt="Chativa Logo"
          /> */}
          <h2 className="text-2xl font-bold">Sign up</h2>
          <p className="text-gray-500 dark:text-gray-300">
            Get your Chativa account now.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
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
                type="email"
                required
                className="w-full px-3 py-2 mt-1 text-sm border rounded-md shadow-sm border-gray-300 focus:outline-none dark:bg-gray-900 dark:border-gray-500"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-3 py-2 mt-1 text-sm border rounded-md shadow-sm border-gray-300 focus:outline-none dark:bg-gray-900 dark:border-gray-500"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
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
            </div>
          </div>

          {error && <div className="text-red-500 text-center">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>

          {/* Term of use line */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-300">
            By registering you agree to the Chativa{" "}
            <span
              href="#"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              <Link to="/terms-of-use"> Terms of Use </Link>
            </span>
          </div>
        </form>

        <div className="flex justify-center mt-6 text-sm">
          <p className="text-gray-600 dark:text-gray-100">
            Already have an account?{" "}
            <span
              href="#"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              <Link to="/signin">Sign in</Link>
            </span>
          </p>
        </div>
      </div>
      <div className="text-center mt-6 text-gray-400 text-sm">
        // © 2024 Chativa. Crafted with ❤️ by Manish //{" "}
      </div>
    </div>
  );
};

export default SignUpPage;

