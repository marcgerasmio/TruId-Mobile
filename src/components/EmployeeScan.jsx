import EmployeeNavigations from "./EmployeeNavigations.jsx";
import { FaUserSecret } from "react-icons/fa";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient.jsx";

const EmployeeUser = () => {
  const [userData, setUserData] = useState([]);
  const number = sessionStorage.getItem("number");
  const navigate = useNavigate();

  const fetch_user = async () => {
    try {
      const { data, error } = await supabase
        .from("Employee")
        .select("*")
        .eq("id_number", number)
        .single();
      if (error) throw error;
      setUserData(data);
      console.log(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
    }
  };

  const scanQRCode = async () => {
    const codeReader = new BrowserMultiFormatReader();
    const videoElement = document.createElement("video");
    videoElement.style.width = "100%";
    videoElement.style.height = "auto";
    const videoContainer = document.getElementById("video-container");

    try {
      if (videoContainer) {
        videoContainer.innerHTML = ""; 
        videoContainer.appendChild(videoElement);
      }

      const result = await codeReader.decodeOnceFromVideoDevice(undefined, videoElement);

      if (result) {
        const scannedValue = result.text;
        sessionStorage.setItem("scannedQRCode", scannedValue); 
        navigate("/payment"); 
      }
    } catch (error) {
      console.error("QR Code scan failed:", error);
      alert("Unable to scan the QR Code. Please try again.");
    } finally {
      codeReader.reset(); 
      if (videoContainer) {
        videoContainer.innerHTML = ""; 
      }
    }
  };

  const logout = () =>{
    navigate("/");
    sessionStorage.clear();
  }

  useEffect(() => {
    fetch_user();
  }, []);

  return (
    <>
      <div className="font-mono container mx-auto w-full p-5 space-y-6">
        <div className="card mt-3">
          <div className="flex justify-center content-center gap-2">
            <FaUserSecret size={24} />
            <h2 className="text-2xl font-extrabold">Employee Details</h2>
          </div>
        </div>
        <hr />
        <div className="flex justify-center content-center">
          <BsQrCodeScan size={200} />
        </div>
        <div id="video-container" className="flex justify-center content-center w-full h-auto bg-black"></div>
        <div className="flex justify-center content-center mt-4">
          <button
            className="btn w-2/3 btn-success text-white font-bold text-lg"
            onClick={scanQRCode}
          >
            Scan
          </button>
        </div>
        <hr />
        <div className="max-h-screen">
          <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
            <div className="space-y-5">
              <label className="input input-bordered flex items-center gap-2">
                EMPLOYEE ID :
                <input
                  type="text"
                  className="grow"
                  placeholder={userData.id_number}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                EMPLOYEE :
                <input
                  type="text"
                  className="grow"
                  placeholder={userData.employee_name}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                SECTION ASSIGNED :
                <input
                  type="text"
                  className="grow"
                  placeholder={userData.department_assigned}
                  disabled
                />
              </label>
            </div>
            <button className="w-full btn btn-error text-white font-bold text-lg"
            onClick={logout}>
              <BiSolidLogOutCircle size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <EmployeeNavigations />
    </>
  );
};

export default EmployeeUser;
