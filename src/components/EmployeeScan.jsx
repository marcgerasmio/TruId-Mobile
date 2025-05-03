import EmployeeNavigations from "./EmployeeNavigations.jsx";
import { IoQrCode } from "react-icons/io5";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient.jsx";

const EmployeeUser = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const number = sessionStorage.getItem("number");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("Employee")
          .select("*")
          .eq("id_number", number)
          .single();

        if (error) throw error;
        setUserData(data);
      } catch (err) {
        console.error("Fetch error:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [number]);

  const scanQRCode = async () => {
    const codeReader = new BrowserMultiFormatReader();
    const videoElement = document.createElement("video");
    videoElement.classList.add("w-full", "rounded-lg", "shadow-md");

    const container = document.getElementById("video-container");
    try {
      if (container) {
        container.innerHTML = "";
        container.appendChild(videoElement);
      }

      const result = await codeReader.decodeOnceFromVideoDevice(
        undefined,
        videoElement
      );
      if (result) {
        sessionStorage.setItem("scannedQRCode", result.text);
        navigate("/payment");
      }
    } catch (err) {
      console.error("QR scan failed:", err);
      alert("Could not scan the QR code. Please try again.");
    } finally {
      codeReader.reset();
      if (container) container.innerHTML = "";
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-green-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-mono pb-20">
      {/* Header */}
      <div className="bg-blue-300 text-white shadow-md py-4 px-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center tracking-tight">
          My Profile
        </h1>
        <button
          onClick={logout}
          className="flex items-center bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200"
        >
          <BiSolidLogOutCircle className="mr-2" />
          Sign Out
        </button>
      </div>

      {/* Scanner & Info */}
      <div className="max-w-3xl mx-auto px-4 mt-5 space-y-6">
        {/* QR Scanner Card */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-3 text-center">
          <div
            id="video-container"
            className="w-full h-80 bg-black rounded-lg flex items-center justify-center"
          >
            <p className="text-white text-sm">Camera feed appears here</p>
          </div>
          <button
            onClick={scanQRCode}
            className="btn btn-info w-full text-white mt-4 rounded-full"
          >
            <IoQrCode />
            Start Scan
          </button>
        </div>

        {/* Employee Details Card */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b bg-green-50 flex items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Employee Information
            </h2>
          </div>

          <div className="p-6 space-y-5">
            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-lg mr-3">
                <span className="text-gray-600 font-bold text-sm">ID</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="text-lg font-semibold text-gray-800">
                  {userData.id_number || "Not available"}
                </p>
              </div>
            </div>

            <div className="border-t pt-4 flex items-start">
              <div className="bg-gray-100 p-2 rounded-lg mr-3">
                <span className="text-gray-600 font-bold text-sm">👤</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-800">
                  {userData.employee_name || "Not available"}
                </p>
              </div>
            </div>

            <div className="border-t pt-4 flex items-start">
              <div className="bg-gray-100 p-2 rounded-lg mr-3">
                <span className="text-gray-600 font-bold text-sm">🏢</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Section Assigned</p>
                <p className="text-lg font-semibold text-gray-800">
                  {userData.department_assigned || "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <EmployeeNavigations />
    </div>
  );
};

export default EmployeeUser;
