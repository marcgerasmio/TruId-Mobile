import EmployeeNavigations from "./EmployeeNavigations.jsx";
import { FaQrcode, FaBuilding, FaUser } from "react-icons/fa";

const EmployeeDashboard = () => {
  return (
    <>
      <div className="font-mono container mx-auto w-full p-4 space-y-6">
        <div className="card flex items-center space-x-2 p-2">
          <div className="avatar w-28 h-28 rounded-full overflow-hidden">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Tenant"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center content-center mt-2">
            <h3 className="text-2xl font-extrabold">Marion Jotohot</h3>
          </div>
          <p className="text-md text-gray-500">EMPLOYEE ID: EMP1234</p>
        </div>
        <hr />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center">
            <FaQrcode className="mr-2 h-5 w-5" />
            Scanned QR Code
          </h3>
          <div className="card bg-base-200">
            <div className="card-body p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span>Scans Completed</span>
                <span className="badge badge-secondary">15 / 30</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value="50"
                max="100"
              ></progress>
              <p className="text-sm text-base-content text-opacity-60">
                50% of daily target completed
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center">
            <FaBuilding className="mr-2 h-5 w-5" />
            Department Assignment
          </h3>
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <p className="font-medium">Rent Collection</p>
              <p className="text-sm text-base-content text-opacity-60">
                Floor: 3rd & 4th
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center">
            <FaUser className="mr-2 h-5 w-5" />
            Today's Tenants
          </h3>
          <div className="h-[200px] overflow-y-auto">
            <div className="space-y-2 mb-16">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="card bg-yellow-200">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Department {4 + i}B</p>
                      <p className="text-sm text-base-content text-opacity-60">
                        Gaisano Mall - Butuan
                      </p>
                    </div>
                    <span className="badge bg-yellow-600 text-white p-3 font-bold">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <EmployeeNavigations />
    </>
  );
};

export default EmployeeDashboard;
