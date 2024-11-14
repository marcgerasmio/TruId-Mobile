import Register from "./Register.jsx";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [isLogin, isRegister] = useState(true);
  const [password, showPassword] = useState(false);

  const SwitchToggler = () => {
    isRegister(!isLogin);
  };

  return (
    <>
      <div className="flex flex-col container mx-auto">
        {isLogin ? (
          <div className="p-2">
            <h1 className="mb-5 text-8xl sm:text-4xl lg:text-5xl font-bold">
              Tru
              <span className="text-red-700">I</span>
              <span className="text-blue-900">D</span>
            </h1>
            <form>
              <label className="input input-bordered flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow text-gray-600"
                  placeholder="Enter an email"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={password ? "text" : "password"}
                  className="grow text-gray-600"
                  placeholder="Enter a password"
                />
              </label>
              <select className="select select-bordered w-full mb-3 text-gray-500">
                <option disabled selected>
                  Login as:
                </option>
                <option>Employee</option>
                <option>Tenant</option>
              </select>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    onChange={() => showPassword(!password)}
                    className="mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  Show Password
                </label>
              </div>
              <NavLink to="/tenant">
                <button
                  type="submit"
                  className="w-full py-3 font-bold text-white bg-buttonColor rounded-lg"
                >
                  Login
                </button>
              </NavLink>
            </form>
            <div className="divider before:bg-white after:bg-white">or</div>
            <button
              className="w-full py-3 font-bold text-white bg-red-700 border-red-700 rounded-lg"
              onClick={SwitchToggler}
            >
              Create an Account
            </button>
          </div>
        ) : (
          <Register />
        )}
      </div>
    </>
  );
};

export default Login;
