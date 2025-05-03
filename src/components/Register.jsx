import React, { useState } from "react";
import { FaUser, FaBuilding } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import supabase from "./supabaseClient";
import QRCode from "qrcode";
import { PiUserListFill } from "react-icons/pi";
import Login from "./Login";

export default function RegistrationForm() {
  const [isRegister, isLogin] = useState(true);
  const [userType, setUserType] = useState("tenant");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qr_link, setQrLink] = useState("");
  const [tenant_password, setTenantPassword] = useState("");
  const [employee_password, setEmployeePassword] = useState("");
  const [store_name, setStoreName] = useState("");
  const [tenant_name, setTenantName] = useState("");
  const [business_number, setBusinessNumber] = useState("");
  const [business_type, setBusinessType] = useState("");

  const [id_number, setIdNumber] = useState("");
  const [employee_name, setEmployeeName] = useState("");
  const [department_assigned, setDepartmentAssigned] = useState("");

  const SwitchToggler = () => {
    isLogin(!isRegister);
  };

  const register = async () => {
    setLoading(true);
    try {
      if (userType === "tenant") {
        await generateqr(business_number);
      } else {
        await register_employee();
      }
    } finally {
      setLoading(false);
    }
  };

  const generateqr = async (business_number) => {
    try {
      // Check if business_number already exists
      const { data: existing, error: checkError } = await supabase
        .from("Tenant")
        .select("business_number")
        .eq("business_number", business_number)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        // Not the "no rows" error — so an actual error
        console.error("Error checking business number:", checkError);
        alert("An error occurred while checking business number.");
        return;
      }

      if (existing) {
        alert("Business number already exists. Please use a different one.");
        return;
      }

      // Proceed to generate QR and register
      const data = await QRCode.toDataURL(business_number);
      setQrLink(data);
      if (data) {
        register_tenant(data);
      } else {
        console.error("QR link is empty");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const register_tenant = async (qrlink) => {
    console.log(qr_link);
    const { data, error } = await supabase.from("Tenant").insert([
      {
        store_name,
        tenant_name,
        business_number,
        business_type,
        qr_link: qrlink,
        password: tenant_password,
        status: "Pending",
      },
    ]);
    if (error) {
      console.error("Error inserting data:", error);
      alert("Error inserting data");
    } else {
      console.log("Data inserted successfully:", data);
      alert("Register Successful");
      window.location.reload();
    }
  };

  const register_employee = async () => {
    const { data, error } = await supabase.from("Employee").insert([
      {
        id_number,
        employee_name,
        department_assigned,
        password: employee_password,
        status: "Pending",
      },
    ]);
    if (error) {
      console.error("Error inserting data:", error);
      alert("Error inserting data");
    } else {
      console.log("Data inserted successfully:", data);
      alert("Register Successful");
      window.location.reload();
    }
  };

  const renderTenantForm = () => (
    <div>
      <label className="input input-bordered flex items-center gap-2 mb-2">
        <FaStore className="text-gray-600" />
        <input
          type="text"
          className="grow text-gray-700"
          placeholder="Store Name"
          value={store_name}
          onChange={(e) => setStoreName(e.target.value)}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 text-gray-600"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow text-gray-700"
          placeholder="Tenant Name"
          value={tenant_name}
          onChange={(e) => setTenantName(e.target.value)}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2 mb-2">
        <IoTicket className="text-gray-600" />
        <input
          type="text"
          className="grow text-gray-700"
          placeholder="Business Number"
          value={business_number}
          onChange={(e) => setBusinessNumber(e.target.value)}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 text-gray-600"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type={showPassword ? "text" : "password"}
          className="grow text-gray-600"
          placeholder="Enter password"
          value={tenant_password}
          onChange={(e) => setTenantPassword(e.target.value)}
        />
      </label>

      <label className="input input-bordered flex items-center text-gray-700 mb-3">
        <select
          className="grow"
          value={business_type}
          onChange={(e) => setBusinessType(e.target.value)}
        >
          <option value="" disabled selected>
            🏢 Business Type
          </option>
          <option value="Meat">🍖 Meat</option>
          <option value="Fish">🐟 Fish</option>
          <option value="Fruit">🍎 Fruit</option>
          <option value="Vegetable">🥦 Vegetable</option>
          <option value="Groceries">🛒 Groceries</option>
          <option value="Non Food">🚫 Non Food</option>
        </select>
      </label>
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2 border-gray-300 rounded focus:ring-blue-500"
          />
          Show Password
        </label>
      </div>
    </div>
  );

  const renderEmployeeForm = () => (
    <div>
      <label className="input input-bordered flex items-center gap-2 mb-2">
        <FaIdCard className="text-gray-600" />
        <input
          type="text"
          className="grow text-gray-700"
          placeholder="ID Number"
          value={id_number}
          onChange={(e) => setIdNumber(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 text-gray-600"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow text-gray-700"
          placeholder="Employee Name"
          value={employee_name}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 text-gray-600"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type={showPassword ? "text" : "password"}
          className="grow text-gray-600"
          placeholder="Enter password"
          value={employee_password}
          onChange={(e) => setEmployeePassword(e.target.value)}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2 mb-3 text-gray-700">
        <select
          className="grow"
          value={department_assigned}
          onChange={(e) => setDepartmentAssigned(e.target.value)}
        >
          <option value="" disabled selected>
            🏢 Assigned Dept.
          </option>
          <option value="Meat">🍖 Meat</option>
          <option value="Fish">🐟 Fish</option>
          <option value="Fruit">🍎 Fruit</option>
          <option value="Vegetable">🥦 Vegetable</option>
          <option value="Groceries">🛒 Groceries</option>
          <option value="Non Food">🚫 Non Food</option>
        </select>
      </label>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          Show Password
        </label>
      </div>
    </div>
  );

  return (
    <>
      {isRegister ? (
        <div className="">
          <div>
            <h1 className="mb-5 text-8xl sm:text-4xl lg:text-5xl font-bold">
              Tru
              <span className="text-error">I</span>
              <span className="text-info">D</span>
            </h1>
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 font-medium ${
                  userType === "tenant"
                    ? "text-white bg-info rounded-full"
                    : "text-white"
                }`}
                onClick={() => setUserType("tenant")}
              >
                <FaBuilding className="inline" /> Tenant
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  userType === "employee"
                    ? "text-white bg-info rounded-full"
                    : "text-white"
                }`}
                onClick={() => setUserType("employee")}
              >
                <FaUser className="inline" /> Employee
              </button>
            </div>
            {userType === "tenant" ? renderTenantForm() : renderEmployeeForm()}
            <button
              className="btn btn-info w-full mb-3 text-white rounded-full flex items-center justify-center gap-2"
              onClick={register}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                <PiUserListFill size={17} />
              )}
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              className="w-full text-white btn btn-error rounded-full"
              onClick={SwitchToggler}
            >
              Already have an account
            </button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
