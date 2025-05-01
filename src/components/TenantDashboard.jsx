import TenantNavigations from "./TenantNavigations.jsx";
import { TbClockDollar } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { TbHistoryToggle } from "react-icons/tb";
import { TbCalendarDue } from "react-icons/tb";
import supabase from "./supabaseClient.jsx";
import { useState, useEffect } from 'react';

const TenantDashboard = () => {
const [userdata, setUserData] = useState([]);
const [pendingdata, setPendingData] = useState([]);
const [completeddata, setCompletedData] = useState([]);
const number = sessionStorage.getItem('number');
const totalDue = pendingdata.reduce((total, item) => total + Number(item.total || 0), 0);



const fetch_user = async () => {
  try {
    const { error, data } = await supabase
      .from('Tenant')
      .select('*')
      .eq('business_number', number)
      .single();
    setUserData(data);
    console.log(data);
  } catch (error) {
    alert("An unexpected error occurred.");
    console.error('Error during registration:', error.message);
  }
};

const fetch_pending = async () => {
  try {
    const { error, data } = await supabase
      .from('Rent')
      .select('*')
      .eq('business_number', number)
      .eq('status', 'Pending')

    setPendingData(data);
  } catch (error) {
    alert("An unexpected error occurred.");
    console.error('Error during registration:', error.message);
  }
};

const fetch_completed = async () => {
  try {
    const { error, data } = await supabase
      .from('Rent')
      .select('*')
      .eq('business_number', number)
      .eq('status', 'Paid')

      setCompletedData(data);
  } catch (error) {
    alert("An unexpected error occurred.");
    console.error('Error during registration:', error.message);
  }
};


useEffect(() => {
  fetch_user();
  fetch_pending();
  fetch_completed();
}, []);
  return (
    <>
      <div className="font-mono container mx-auto w-full p-4 space-y-6">
        <div className="card flex items-center space-x-4 p-2">
          <div className="flex justify-center content-content mt-2">
          </div>
          <h3 className="text-2xl font-extrabold">{userdata.store_name}</h3>
          <p className="text-md text-gray-500">{userdata.business_type} Section</p>
          <p className="text-md text-gray-500">Tenant Name: {userdata.tenant_name}</p>
        </div>
        <hr />

        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold flex items-center text-red-600">
              <TbCalendarDue className="mr-2" />
              Due Payment/s
            </h3>
            <NavLink to="/qrcode">
              <button className="btn btn-link text-red-600">Pay Due/s</button>
            </NavLink>
          </div>
           <div className="card shadow-xl border-2 border-red-600">
        <div className="card-body">
          {pendingdata.map((item, index) => (
            <div className="flex justify-between mt-2" key={index}>
              <span>{item.date}</span>
              <span className="font-semibold">₱{item.total}</span>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <span className="font-semibold">Total Due</span>
            <span className="font-semibold text-lg">₱{totalDue}</span>
          </div>
        </div>
      </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold flex items-center text-green-700">
              <TbHistoryToggle className="mr-2" />
              Recent Payments
            </h3>
            <NavLink to="/history"> 
              <button className="btn btn-link text-green-700">View all</button>
            </NavLink>
          </div>
          <div className="max-h-screen">
          <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
            {completeddata.map((item, index) => (
              <div className="card shadow-md border-2 border-green-500" key={index}>
                <div className="flex justify-between p-5">
                  <div>
                    <p className="font-semibold">Rent</p>
                    <p className="text-sm text-gray-500">Paid on {item.date}</p>
                    <span className="font-semibold">₱{item.total}</span>
                  </div>
                  <TbClockDollar size={32} className="me-3 mt-2 text-green-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
      <TenantNavigations />
    </>
  );
};

export default TenantDashboard;
