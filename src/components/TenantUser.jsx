import TenantNavigations from "./TenantNavigations.jsx";
import { FaUserSecret } from "react-icons/fa";
import { BiSolidLogOutCircle } from "react-icons/bi";

const TenantCode = () => {
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
            src="https://api.qrserver.com/v1/create-qr-code/?data=example&size=300x300"
            alt="QR Code"
            className="w-72 h-72"
          />
        </div>
        <hr />

        <div className="max-h-screen">
          <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
            <div className="space-y-4">
              <label className="input input-bordered flex items-center gap-2">
                TENANT :
                <input
                  type="text"
                  className="grow"
                  placeholder="Penshoppe - Butuan"
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                BIRTH :
                <input type="date" className="grow" disabled />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                STALL NO. :
                <input
                  type="text"
                  className="grow"
                  placeholder="12345"
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                BUSINESS NO. :
                <input
                  type="text"
                  className="grow"
                  placeholder="54321"
                  disabled
                />
              </label>
            </div>
            <button className="w-full btn btn-error text-white font-bold text-lg">
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
