import EmployeeNavigations from "./EmployeeNavigations.jsx";
import { FaUserSecret } from "react-icons/fa";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";

const EmployeeUser = () => {
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
        <div className="flex justify-center content-center">
          <button className="btn w-2/3 btn-success text-white font-bold text-lg">
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
                  placeholder="12345"
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                EMPLOYEE :
                <input
                  type="text"
                  className="grow"
                  placeholder="Marion Jotohot"
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                DEPARTMENT :
                <input
                  type="text"
                  className="grow"
                  placeholder="Dept. #1"
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                RELATED INFOS' :
                <input
                  type="text"
                  className="grow"
                  placeholder="Ambot unsa diri"
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
      <EmployeeNavigations />
    </>
  );
};

export default EmployeeUser;
