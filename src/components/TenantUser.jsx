import TenantNavigations from "./TenantNavigations.jsx";
import {
  TbUser,
  TbBuildingStore,
  TbId,
  TbLogout,
  TbCopy,
} from "react-icons/tb";
import supabase from "./supabaseClient.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TenantUser = () => {
  const number = sessionStorage.getItem("number");
  const [userdata, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const fetch_user = async () => {
    try {
      setIsLoading(true);
      const { error, data } = await supabase
        .from("Tenant")
        .select("*")
        .eq("business_number", number)
        .single();

      if (data) {
        setUserData(data);
      }
      if (error) throw error;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetch_user();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-mono pb-20">
      {/* Header */}
      <div className="bg-blue-300 shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              My Profile
            </h1>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-red-100 text-error rounded-lg hover:bg-red-100 transition-colors"
            >
              <TbLogout className="mr-1.5" size={18} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-2 py-4">
        {/* QR Code Card */}
        <div className="bg-white rounded-xl shadow-md border overflow-hidden border-gray-200 mb-6">
          <div className="flex flex-col items-center justify-center p-6">
            {userdata.qr_link ? (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <img
                  src={userdata.qr_link}
                  alt="Tenant QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl w-64 h-64 flex items-center justify-center">
                <p className="text-gray-500">QR Code not available</p>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Scan this QR code to quickly access your tenant information
              </p>
              {/* <button className="mt-3 flex items-center justify-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <TbCopy className="mr-1.5" size={16} />
                <span className="font-medium">Download QR Code</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Tenant Information Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 bg-green-50">
            <div className="flex items-center justify-center">
              <div className="flex justify-center">
                <TbUser className="text-green-600 mr-2" size={22} />
                <h2 className="text-lg font-semibold text-gray-800">
                  Tenant Information
                </h2>
              </div>
              {/* <button className="flex items-center px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                <TbEdit className="mr-1" size={16} />
                <span className="font-medium">Edit</span>
              </button> */}
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Tenant Name */}
            <div className="group">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <TbUser className="text-gray-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Tenant Name
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {userdata.tenant_name || "Not available"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(userdata.tenant_name)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <TbCopy size={18} />
                </button>
              </div>
            </div>

            {/* Store Name */}
            <div className="group pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <TbBuildingStore className="text-gray-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Store Name
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {userdata.store_name || "Not available"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(userdata.store_name)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <TbCopy size={18} />
                </button>
              </div>
            </div>

            {/* Business Number */}
            <div className="group pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <TbId className="text-gray-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Business Number
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {userdata.business_number || "Not available"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(userdata.business_number)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <TbCopy size={18} />
                </button>
              </div>
            </div>

            {/* Business Type */}
            <div className="group pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <TbBuildingStore className="text-gray-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Business Type
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {userdata.business_type || "Not available"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(userdata.business_type)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <TbCopy size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <TenantNavigations />
    </div>
  );
};

export default TenantUser;
