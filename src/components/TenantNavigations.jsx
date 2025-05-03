import { NavLink } from "react-router-dom";
import { IoQrCode } from "react-icons/io5";
import { MdWorkHistory } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { FaHome } from "react-icons/fa";

const TenantNavigations = () => {
  return (
    <div className="btm-nav border-t border-gray-200 shadow-lg font-mono">
      <div className="grid grid-cols-4 max-w-md mx-auto">
        <NavLink
          to="/tenant"
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
          to="/history"
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
          to="/sanction"
          className={({ isActive }) =>
            `p-2 tracking-tighter flex flex-col items-center ${
              isActive ? "border-t-2 border-info text-info" : ""
            }`
          }
        >
          <PiWarningCircleFill className="h-5 w-5" />
          <span className="btm-nav-label text-xs mt-1 font-bold">Sanction</span>
        </NavLink>

        <NavLink
          to="/qrcode"
          className={({ isActive }) =>
            `p-2 flex flex-col items-center ${
              isActive ? "border-t-2 border-info text-info" : ""
            }`
          }
        >
          <IoQrCode className="h-5 w-5" />
          <span className="btm-nav-label text-xs mt-1 font-bold">Code</span>
        </NavLink>
      </div>
    </div>
  );
};

export default TenantNavigations;
