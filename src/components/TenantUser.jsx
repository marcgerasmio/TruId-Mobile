import TenantNavigations from "./TenantNavigations.jsx";
import { FaUserSecret } from "react-icons/fa";
import { BiSolidLogOutCircle } from "react-icons/bi";
import supabase from "./supabaseClient.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TenantCode = () => {
  const number = sessionStorage.getItem('number');
  const [userdata, setUserData] = useState([]);
  const navigate = useNavigate();

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
  
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
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
            <h2 className="text-2xl font-extrabold">Tenant Details</h2>
          </div>
        </div>
        <hr />
        <div className="flex justify-center content-center">
          <img
            src={userdata.qr_link}
            alt="QR Code"
            className="w-72 h-72"
          />
        </div>
        <hr />

        <div className="max-h-screen">
          <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
          <div className="space-y-4">
  <label className="input input-bordered flex items-center gap-2">
    <span className="w-40">TENANT NAME:</span>
    <input
      type="text"
      className="grow"
      placeholder={userdata.tenant_name}
      disabled
    />
  </label>
  
  <label className="input input-bordered flex items-center gap-2">
    <span className="w-40">STORE NAME:</span>
    <input
      type="text"
      className="grow"
      placeholder={userdata.store_name}
      disabled
    />
  </label>

  <label className="input input-bordered flex items-center gap-2">
    <span className="w-40">BUSINESS NUMBER:</span>
    <input
      type="text"
      className="grow"
      placeholder={userdata.business_number}
      disabled
    />
  </label>

  <label className="input input-bordered flex items-center gap-2">
    <span className="w-40">BUSINESS TYPE:</span>
    <input
      type="text"
      className="grow"
      placeholder={userdata.business_type}
      disabled
    />
  </label>
</div>

            <button className="w-full btn btn-error text-white font-bold text-lg" onClick={logout}>
              <BiSolidLogOutCircle size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <TenantNavigations />
    </>
  );
};

export default TenantCode;
