import EmployeeNavigations from "./EmployeeNavigations.jsx";
import { FaQrcode, FaBuilding, FaUser } from "react-icons/fa";
import supabase from "./supabaseClient.jsx";
import { useEffect, useState } from "react";

const EmployeeDashboard = () => {
  const number = sessionStorage.getItem('number');
  const dept = sessionStorage.getItem('dept');
  const [userdata, setUserData] = useState([]);
  const [tenantData, setTenantData] = useState([]);
  

  const fetch_user = async () => {
    try {
      const { error, data } = await supabase
        .from('Employee')
        .select('*')
        .eq('id_number', number)
        .single();
      setUserData(data);

    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during registration:', error.message);
    }
  };

  const fetch_tenants = async () => {
    try {
      const { error, data } = await supabase
        .from('Rent')
        .select('*')
        .eq('department', dept)
        .eq('status', 'Pending')
      setTenantData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during registration:', error.message);
    }
  };


  useEffect(() => {
    fetch_user();
    fetch_tenants();
  }, []);
  return (
    <>
      <div className="font-mono container mx-auto w-full p-4 space-y-6">
        <div className="card flex items-center space-x-2 p-2">
          <div className="flex justify-center content-center mt-2">
            <h3 className="text-2xl font-extrabold">{userdata.employee_name}</h3>
          </div>
          <p className="text-md text-gray-500">EMPLOYEE ID: {userdata.id_number}</p>
        </div>
        <hr />
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center">
            <FaBuilding className="mr-2 h-5 w-5" />
            Department Assignment
          </h3>
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <p className="font-medium">{userdata.department_assigned} Section</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center">
            <FaUser className="mr-2 h-5 w-5" />
            Today's Tenants
          </h3>
          <div className="h-[400px] overflow-y-auto">
          <div className="space-y-2 mb-16">
            {tenantData.map((item, index) => (
              <div key={index} className="card bg-yellow-200">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.store_name}</p>
                    <p className="font-medium">₱{item.total}</p>
                    <p className="text-sm text-base-content text-opacity-60">
                      Rent for {item.date}
                    </p>
                  </div>
                  <span className={`badge p-3 font-bold ${item.status === 'Pending' ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'}`}>
                    {item.status}
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
