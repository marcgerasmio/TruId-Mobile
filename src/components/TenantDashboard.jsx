import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  TbClockDollar,
  TbHistoryToggle,
  TbCalendarDue,
  TbAlertCircle,
} from "react-icons/tb";
import supabase from "./supabaseClient.jsx";
import TenantNavigations from "./TenantNavigations.jsx";
import { TbBuilding, TbUser } from "react-icons/tb";

const TenantDashboard = () => {
  const [userdata, setUserData] = useState({});
  const [pendingdata, setPendingData] = useState([]);
  const [completeddata, setCompletedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const number = sessionStorage.getItem("number");

  const totalDue = pendingdata.reduce(
    (total, item) => total + Number(item.total || 0),
    0
  );

  const fetch_user = async () => {
    try {
      setIsLoading(true);
      const { error, data } = await supabase
        .from("Tenant")
        .select("*")
        .eq("business_number", number)
        .single();

      if (data) setUserData(data);
      if (error) throw error;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const fetch_pending = async () => {
    try {
      const { error, data } = await supabase
        .from("Rent")
        .select("*")
        .eq("business_number", number)
        .eq("status", "Pending");

      if (data) setPendingData(data);
      if (error) throw error;
    } catch (error) {
      console.error("Error fetching pending payments:", error.message);
    }
  };

  const fetch_completed = async () => {
    try {
      const { error, data } = await supabase
        .from("Rent")
        .select("*")
        .eq("business_number", number)
        .eq("status", "Paid")
        .order("date", { ascending: false })
        .limit(5);

      if (data) setCompletedData(data);
      if (error) throw error;
    } catch (error) {
      console.error("Error fetching completed payments:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch_user();
      await fetch_pending();
      await fetch_completed();
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-mono">
      {/* Header Section */}
      <div className="bg-blue-300 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <div className="rounded-xl flex justify-center p-2">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Store Information */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {userdata.store_name || "Your Store"}
                </h1>

                <div className="flex flex-wrap mt-3 gap-3">
                  <div className="flex items-center text-gray-600">
                    <TbBuilding className="mr-1" size={16} />
                    <span className="px-3 py-1 bg-green-50 text-success text-sm font-medium rounded-full">
                      {userdata.business_type || "Business"}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <TbUser className="mr-1" size={16} />
                    <span className="text-sm">
                      Tenant:{" "}
                      <span className="font-semibold text-white">
                        {userdata.tenant_name}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              {/* Action Button */}
              {/* <div className="w-full lg:w-auto">
                <NavLink to="/qrcode" className="block">
                  <button className="w-full lg:w-auto flex items-center justify-center px-6 py-3 bg-success text-white font-medium rounded-full">
                    <TbQrcode className="mr-2" size={20} />
                    <span>Pay Now</span>
                  </button>
                </NavLink>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-3 py-5 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Due Payments Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border">
            <div className="px-3 py-4 bg-red-100 border-b border-red-100">
              <div className="flex justify-center items-center">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <TbCalendarDue className="mr-2 text-red-600" size={20} />
                  Due Payments
                </h2>
                {pendingdata.length > 0 && (
                  <NavLink to="/qrcode">
                    <button className="text-sm text-red-600 font-medium hover:text-red-800">
                      Pay Due/s
                    </button>
                  </NavLink>
                )}
              </div>
            </div>

            <div className="px-6 py-3">
              {pendingdata.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {pendingdata.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="text-gray-600">
                          {formatDate(item.date)}
                        </span>
                        <span className="font-medium text-gray-800">
                          ₱{Number(item.total).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t-2 border-red-100">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        Total Due
                      </span>
                      <span className="font-bold text-xl text-red-600">
                        ₱{totalDue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="inline-flex justify-center items-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <TbCalendarDue className="text-green-600" size={24} />
                  </div>
                  <p className="text-gray-600">No pending payments</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 gap-4">
            <div
              className={`rounded-xl shadow-md overflow-hidden border p-6 ${
                totalDue > 0
                  ? "bg-red-50 border-red-100"
                  : "bg-green-50 border-green-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Current Balance
                  </p>
                  <h3
                    className={`text-2xl font-bold ${
                      totalDue > 0 ? "text-error" : "text-success"
                    }`}
                  >
                    ₱{totalDue.toLocaleString()}
                  </h3>
                </div>
                <div
                  className={`p-3 rounded-full ${
                    totalDue > 0 ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  {totalDue > 0 ? (
                    <TbAlertCircle className="text-error" size={24} />
                  ) : (
                    <TbHistoryToggle className="text-success" size={24} />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl shadow-md overflow-hidden border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Recent Payment
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {completeddata.length > 0
                      ? `₱${Number(
                          completeddata[0]?.total || 0
                        ).toLocaleString()}`
                      : "₱0"}
                  </h3>
                  {completeddata.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(completeddata[0]?.date)}
                    </p>
                  )}
                </div>
                <div className="p-3 rounded-full bg-yellow-100">
                  <TbClockDollar className="text-warning" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Payments Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center tracking-tighter">
              Recent Payments
            </h2>
            <NavLink
              to="/history"
              className="text-sm bg-blue-300 text-white p-1 px-3 rounded-full"
            >
              See all
            </NavLink>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            {completeddata.length > 0 ? (
              <div className="divide-y divide-gray-300">
                {completeddata.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">
                          Rent Payment
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Paid on {formatDate(item.date)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold text-success mr-3">
                          ₱{Number(item.total).toLocaleString()}
                        </span>
                        <div className="p-2 rounded-full bg-yellow-50">
                          <TbClockDollar className="text-warning" size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="inline-flex justify-center items-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <TbHistoryToggle className="text-gray-500" size={24} />
                </div>
                <p className="text-gray-600">No payment history found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <TenantNavigations />
    </div>
  );
};

export default TenantDashboard;
