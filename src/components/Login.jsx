import Register from "./Register.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient.jsx";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [isLogin, isRegister] = useState(true);
  const [password, showPassword] = useState(false);
  const [userType, setUserType] = useState("tenant");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const SwitchToggler = () => {
    isRegister(!isLogin);
  };

  const check = async () => {
    setIsLoading(true);
    try {
      if (userType === "tenant") {
        await login_tenant();
      } else {
        await login_employee();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login_tenant = async () => {
    const { data } = await supabase
      .from("Tenant")
      .select("*")
      .eq("business_number", id)
      .single();

    if (data && data.password === pass && data.business_number === id) {
      if (data.status === "Pending") {
        setStatusMessage("Your account is waiting for confirmation.");
        setShowStatusModal(true);
        return;
      } else if (data.status === "Rejected") {
        setStatusMessage(
          "Account registration is rejected. Please contact administrator."
        );
        setShowStatusModal(true);
        return;
      } else if (data.status === "Accepted") {
        const number = data.business_number;
        sessionStorage.setItem("number", number);
        navigate("/tenant");
      }
    } else {
      alert("Wrong Credentials");
    }
  };

  const login_employee = async () => {
    const { data } = await supabase
      .from("Employee")
      .select("*")
      .eq("id_number", id)
      .single();

    if (data && data.password === pass && data.id_number === id) {
      if (data.status === "Pending") {
        setStatusMessage("Your account is waiting for confirmation.");
        setShowStatusModal(true);
        return;
      } else if (data.status === "Rejected") {
        setStatusMessage(
          "Account registration is rejected. Please contact administrator."
        );
        setShowStatusModal(true);
        return;
      } else if (data.status === "Accepted") {
        const number = data.id_number;
        sessionStorage.setItem("number", number);
        const dept = data.department_assigned;
        sessionStorage.setItem("dept", dept);
        const name = data.employee_name;
        sessionStorage.setItem("name", name);
        navigate("/employee");
      }
    } else {
      alert("Wrong Credentials");
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {isLogin ? (
          <div>
            <h1 className="mb-5 text-8xl sm:text-4xl lg:text-5xl font-bold">
              Tru
              <span className="text-error">I</span>
              <span className="text-info">D</span>
            </h1>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 text-gray-700"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow text-gray-700"
                placeholder="Employee No. or Business No."
                onChange={(e) => setId(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 text-gray-700"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={password ? "text" : "password"}
                className="grow text-gray-700"
                placeholder="Enter a password"
                onChange={(e) => setPass(e.target.value)}
              />
            </label>
            <div className="relative w-full mb-4">
              <select
                className="select select-bordered w-full text-gray-700"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option disabled selected>
                  Login as:
                </option>
                <option value="employee">👔 Employee</option>
                <option value="tenant">👥 Tenant</option>
              </select>
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  onChange={() => showPassword(!password)}
                  className="mr-2 text-blue-600 border-gray-300 round ed focus:ring-blue-500"
                />
                Show Password
              </label>
            </div>
            <button
              onClick={check}
              className="btn btn-info w-full text-white rounded-full mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                <FaSignInAlt />
              )}
              {isLoading ? "Signing in..." : "Login"}
            </button>
            <button
              className="w-full py-3 font-bold text-white btn-error btn rounded-full"
              onClick={SwitchToggler}
            >
              Create an Account
            </button>
          </div>
        ) : (
          <Register />
        )}
      </div>

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-black">
              Account Status
            </h3>
            <p className="mb-4 text-black">{statusMessage}</p>
            <button
              onClick={() => setShowStatusModal(false)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
