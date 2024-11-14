import TenantNavigations from "./TenantNavigations.jsx";
import { TbClockDollar } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { TbHistoryToggle } from "react-icons/tb";
import { TbCalendarDue } from "react-icons/tb";

const TenantDashboard = () => {
  return (
    <>
      <div className="font-mono container mx-auto w-full p-4 space-y-6">
        <div className="card flex items-center space-x-4 p-2">
          <div className="avatar w-28 h-28 rounded-full overflow-hidden">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Tenant"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center content-center mt-2">
            <h3 className="text-2xl font-extrabold">Penshoppe-Butuan</h3>
          </div>
          <p className="text-md text-gray-500">Gaisano Mall Butuan City</p>
          <p className="text-md text-gray-500">2nd Floor, Department No. 2</p>
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
              <div className="flex justify-between">
                <span>June 2024</span>
                <span className="font-semibold">$1,200</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>July 2024</span>
                <span className="font-semibold">$150</span>
              </div>
              <div className="flex justify-between mt-4">
                <span className="font-semibold">Total Due</span>
                <span className="font-semibold text-lg">$1,350</span>
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
              <div className="card shadow-md border-2 border-green-500">
                <div className="flex justify-between p-5">
                  <div>
                    <p className="font-semibold">Rent</p>
                    <p className="text-sm text-gray-500">Paid on Apr 1, 2023</p>
                    <span className="font-semibold">$1,200</span>
                  </div>
                  <TbClockDollar
                    size={32}
                    className="me-3 mt-2 text-green-700"
                  />
                </div>
              </div>
              <div className="card shadow-md border-2 border-green-500">
                <div className="flex justify-between p-5">
                  <div>
                    <p className="font-semibold">Rent</p>
                    <p className="text-sm text-gray-500">
                      Paid on June 1, 2023
                    </p>
                    <span className="font-semibold">$1,200</span>
                  </div>
                  <TbClockDollar
                    size={32}
                    className="me-3 mt-2 text-green-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TenantNavigations />
    </>
  );
};

export default TenantDashboard;
