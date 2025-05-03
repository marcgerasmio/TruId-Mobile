import EmployeeNavigations from "./EmployeeNavigations.jsx";
import { FaQrcode, FaBuilding, FaUser, FaBell } from "react-icons/fa";
import supabase from "./supabaseClient.jsx";
import { useEffect, useState } from "react";
import { MdWavingHand } from "react-icons/md";

const EmployeeDashboard = () => {
  const number = sessionStorage.getItem("number");
  const dept = sessionStorage.getItem("dept");
  const [userdata, setUserData] = useState([]);
  const [tenantData, setTenantData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetch_user = async () => {
    try {
      const { error, data } = await supabase
        .from("Employee")
        .select("*")
        .eq("id_number", number)
        .single();
      setUserData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
    }
  };

  const fetch_tenants = async () => {
    try {
      const { error, data } = await supabase
        .from("Rent")
        .select("*")
        .eq("department", dept)
        .eq("status", "Pending");
      setTenantData(data);
      setIsLoading(false);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch_user();
    fetch_tenants();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      {/* Header */}
      <div className="bg-blue-100 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col">
            <div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                Welcome back,{" "}
                <span className="text-info inline-flex items-center">
                  {userdata?.employee_name}
                  <span className="ml-1 inline-block align-middle">
                    <MdWavingHand />
                  </span>
                </span>
              </h1>
              <p className="text-sm text-gray-500">Employee Dashboard</p>
            </div>
            <div className="font-medium text-sm text-gray-500">
              <span className="mr-1">ID:</span> {userdata?.id_number}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Department Card */}
          <div className="bg-white rounded-lg shadow-md p-4 border">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaBuilding className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="ml-3 text-lg font-semibold text-gray-800">
                Assigned Department
              </h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <p className="text-xl font-medium text-gray-700">
                {userdata?.department_assigned} Section
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow-md p-4 border">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FaUser className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="ml-3 text-lg font-semibold text-gray-800">
                Tenant Summary
              </h2>
            </div>
            <div className="flex space-x-4">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex-1 text-center">
                <p className="text-xs text-gray-500">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-700">
                  {tenantData?.length || 0}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex-1 text-center">
                <p className="text-xs text-gray-500">Today's Date</p>
                <p className="text-lg font-bold text-gray-700">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Tenants Section */}
        <div className="mt-4">
          <div className="bg-white rounded-lg shadow-md border overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-3 rounded-full bg-yellow-100">
                  <FaUser className="h-5 w-5 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
                  Today's Pending Tenants
                </h3>
              </div>
              {/* <span className="bg-yellow-100 text-yellow-800 font-medium text-xs px-3 py-1 rounded-full">
                {tenantData?.length || 0} Pending
              </span> */}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : tenantData?.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {tenantData.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {item.store_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Rent for {item.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-bold text-gray-900">₱{item.total}</p>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {item.status}
                        </span>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition duration-200">
                          Process
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <p className="mt-4 text-lg font-medium text-gray-500">
                  No pending tenants today
                </p>
                <p className="text-sm text-gray-400">
                  All payments have been processed
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <EmployeeNavigations />
    </div>
  );
};

export default EmployeeDashboard;
