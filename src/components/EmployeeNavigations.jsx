import { NavLink } from "react-router-dom";
import { IoQrCode } from "react-icons/io5";
import { MdWorkHistory, MdGroups } from "react-icons/md";
import { FaHome } from "react-icons/fa";

const EmployeeNavigations = () => {
  return (
    <div className="btm-nav border-t border-gray-200 shadow-lg font-mono">
      <div className="grid grid-cols-4 max-w-md mx-auto">
        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `p-2 flex flex-col items-center ${
              isActive ? "border-t-2 border-info text-info" : ""
            }`
          }
        >
          <FaHome className="h-5 w-5" />
          <span className="btm-nav-label text-xs mt-1 font-bold">Home</span>
        </NavLink>

        <NavLink
          to="/scanned"
          className={({ isActive }) =>
            `p-2 tracking-tighter flex flex-col items-center ${
              isActive ? "border-t-2 border-info text-info" : ""
            }`
          }
        >
          <MdWorkHistory className="h-5 w-5" />
          <span className="btm-nav-label text-xs mt-1 font-bold">History</span>
        </NavLink>

        <NavLink
          to="/todaystenants"
          className={({ isActive }) =>
            `p-2 tracking-tighter flex flex-col items-center ${
              isActive ? "border-t-2 border-info text-info" : ""
            }`
          }
        >
          <MdGroups className="h-5 w-5" />
          <span className="btm-nav-label text-xs mt-1 font-bold">Tenants</span>
        </NavLink>

        <NavLink
          to="/user"
          className={({ isActive }) =>
            `p-2 flex flex-col items-center ${
              isActive ? "border-t-2 border-info text-info" : ""
            }`
          }
        >
          <IoQrCode className="h-5 w-5" />
          <span className="btm-nav-label text-xs mt-1 font-bold">Scan</span>
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeNavigations;
