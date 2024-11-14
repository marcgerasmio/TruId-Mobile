import { NavLink } from "react-router-dom";
import { IoQrCode } from "react-icons/io5";
import { ImHistory } from "react-icons/im";
import { FaUsers } from "react-icons/fa";

const EmployeeNavigations = () => {
  return (
    <div className="font-mono">
      <div className="btm-nav">
        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `p-2 ${isActive ? "border-t-2 border-blue-950 text-blue-950" : ""}`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="btm-nav-label font-bold">Home</span>
        </NavLink>

        <NavLink
          to="/scanned"
          className={({ isActive }) =>
            `p-2 ${isActive ? "border-t-2 border-blue-950 text-blue-950" : ""}`
          }
        >
          <ImHistory className="h-6 w-6" />
          <span className="btm-nav-label font-bold">History</span>
        </NavLink>

        <NavLink
          to="/todaystenants"
          className={({ isActive }) =>
            `p-2 ${isActive ? "border-t-2 border-blue-950 text-blue-950" : ""}`
          }
        >
          <FaUsers className="h-6 w-6" />
          <span className="btm-nav-label font-bold">Tenants</span>
        </NavLink>

        <NavLink
          to="/user"
          className={({ isActive }) =>
            `p-2 ${isActive ? "border-t-2 border-blue-950 text-blue-950" : ""}`
          }
        >
          <IoQrCode className="h-6 w-6" />
          <span className="btm-nav-label font-bold">Scan</span>
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeNavigations;
