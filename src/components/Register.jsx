import React, { useState } from "react";
import { FaUser, FaBuilding } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import supabase from "./supabaseClient";
import QRCode from 'qrcode';

import Login from "./Login";

export default function RegistrationForm() {
  const [isRegister, isLogin] = useState(true);
  const [userType, setUserType] = useState("tenant");
  const [showPassword, setShowPassword] = useState(false);

  const [qr_link, setQrLink] = useState('');
  const [password, setPassword] = useState('');
  const [store_name, setStoreName] = useState('');
  const [tenant_name, setTenantName] = useState('');
  const [business_number, setBusinessNumber] = useState('');
  const [business_type, setBusinessType] = useState('');

  const [id_number, setIdNumber] = useState('');
  const [employee_name, setEmployeeName] = useState('');
  const [department_assigned, setDepartmentAssigned] = useState('');

  const SwitchToggler = () => {
    isLogin(!isRegister);
  };

  const register = () => {
  if(userType === 'tenant'){
    generateqr(business_number);
  }
  else{
    register_employee();
  }
  }

  const generateqr = async (business_number) => {
    try {
      const data = await QRCode.toDataURL(business_number);
      setQrLink(data);
      console.log(data);
      if (data) {
        register_tenant(data);
      } else {
        console.error('QR link is empty');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const register_tenant = async (qrlink) => {
    console.log(qr_link)
    const { data, error } = await supabase
      .from('Tenant')
      .insert([
        {
         store_name,
         tenant_name,
         business_number,
         business_type,
         qr_link: qrlink,
         password,
         status: 'Pending',
        },
      ])
    if (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data');
    } else {
      console.log('Data inserted successfully:', data);
      alert('Register Successful');
      window.location.reload();
    }
  };

  const register_employee = async () => {
    const { data, error } = await supabase
      .from('Employee')
      .insert([
        {
       id_number,
       employee_name,
       department_assigned,
       password,
       status: 'Pending',
        },
      ])
    if (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data');
    } else {
      console.log('Data inserted successfully:', data);
      alert('Register Successful');
      window.location.reload();
    }
  };

  const renderTenantForm = () => (
    <div className="space-y-4">
      <label className="input input-bordered flex items-center gap-2">
      <FaStore />
      <input type="text" className="grow" placeholder="Store Name" value={store_name} onChange={(e) => setStoreName(e.target.value)} />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" className="grow" placeholder="Tenant Name" value={tenant_name} onChange={(e) => setTenantName(e.target.value)}/>
      </label>

      <label className="input input-bordered flex items-center gap-2">
      <IoTicket />
        <input type="text" className="grow" placeholder="Business Number" value={business_number}  onChange={(e) => setBusinessNumber(e.target.value)}/>
      </label>
      <label className="input input-bordered flex items-center gap-2">
      <select className="grow" value={business_type} onChange={(e) => setBusinessType(e.target.value)}>
        <option value="" disabled selected>Type of Business</option>
        <option value="Meat">Meat</option>
        <option value="Fish">Fish</option>
        <option value="Fruit">Fruit</option>
        <option value="Vegetable">Vegetable</option>
        <option value="Groceries">Groceries</option>
        <option value="Non Food">Non Food</option>
      </select>
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
                 type={showPassword ? "text" : "password"}
                  className="grow text-gray-600"
                  placeholder="Enter  password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm">
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

  const renderEmployeeForm = () => (
    <div className="space-y-4">
      <label className="input input-bordered flex items-center gap-2">
      <FaIdCard />
        <input type="text" className="grow" placeholder="ID Number" value={id_number} onChange={(e) => setIdNumber(e.target.value)}/>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" className="grow" placeholder="Employee Name" value={employee_name} onChange={(e) => setEmployeeName(e.target.value)}/>
      </label>

      <label className="input input-bordered flex items-center gap-2">
      <select className="grow" value={department_assigned}  onChange={(e) => setDepartmentAssigned(e.target.value)}>
        <option value="" disabled selected>Department Assigned</option>
        <option value="Meat">Meat</option>
        <option value="Fish">Fish</option>
        <option value="Fruit">Fruit</option>
        <option value="Vegetable">Vegetable</option>
        <option value="Groceries">Groceries</option>
        <option value="Non Food">Non Food</option>
      </select>
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
                  type={showPassword ? "text" : "password"}
                  className="grow text-gray-600"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm">
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
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-5 text-black">
            <h2 className="text-2xl font-bold text-center mb-6">
              Registration
            </h2>
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 font-medium ${
                  userType === "tenant" ? "text-blue-600" : "text-gray-600"
                }`}
                onClick={() => setUserType("tenant")}
              >
                <FaBuilding className="inline mr-2" /> Tenant
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  userType === "employee" ? "text-blue-600" : "text-gray-600"
                }`}
                onClick={() => setUserType("employee")}
              >
                <FaUser className="inline mr-2" /> Employee
              </button>
            </div>
            {userType === "tenant" ? renderTenantForm() : renderEmployeeForm()}
            <button className="w-full px-4 py-3 bg-buttonColor text-white rounded-md shadow-sm font-bold mt-6"
            onClick={register}>
              Submit
            </button>
            <div className="divider">or</div>
            <button
              className="w-full py-3 font-bold text-white bg-red-700 border-red-700 rounded-lg"
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
