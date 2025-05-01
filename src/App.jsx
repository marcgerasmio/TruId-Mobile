import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import TenantDashboard from "./components/TenantDashboard.jsx";
import TenantHistory from "./components/TenantHistory.jsx";
import TenantSanction from "./components/TenantSanction.jsx";
import TenantCode from "./components/TenantUser.jsx";
import EmployeeDashboard from "./components/EmployeeDashboard.jsx";
import EmployeeHistory from "./components/EmployeeHistory.jsx";
import EmployeeTenants from "./components/EmployeeTenants.jsx";
import EmployeeUser from "./components/EmployeeScan.jsx";
import Payment from "./components/Payment.jsx";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/tenant" element={<TenantDashboard />} />
      <Route path="/history" element={<TenantHistory />} />
      <Route path="/sanction" element={<TenantSanction />} />
      <Route path="/qrcode" element={<TenantCode />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/scanned" element={<EmployeeHistory />} />
      <Route path="/todaystenants" element={<EmployeeTenants />} />
      <Route path="/user" element={<EmployeeUser />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
};

export default App;
