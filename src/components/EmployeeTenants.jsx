import EmployeeNavigations from "./EmployeeNavigations.jsx";
import { FaUsers } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import supabase from "./supabaseClient.jsx";
import { useEffect, useState } from "react";

const EmployeeTenants = () => {
  const [sanctions, setSanctions] = useState([]);

  const fetch_sanctions = async () => {
    try {
      const { error, data } = await supabase
        .from("Sanction")
        .select("*")
        .eq("status", "Unresolved");

      if (error) throw error;
      setSanctions(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching sanctions:", error.message);
    }
  };

  useEffect(() => {
    fetch_sanctions();
  }, []);

  return (
    <>
      <div className="font-mono container mx-auto w-full p-5 space-y-6">
        <div className="space-y-2">
          {/* <div className="card mt-3">
            <div className="flex justify-center content-center mb-8 gap-2">
              <>
                <FaUsers size={29} className="text-yellow-600" />
                <h2 className="text-2xl font-semibold">Tenant Sanctions</h2>
              </>
            </div>
          </div> */}

          <div className="flex justify-center content-center">
            <span className="italic text-gray-400">For future purposes...</span>
          </div>

          {/* <div className="max-h-screen">
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
              {sanctions && sanctions.length > 0 ? (
                sanctions.map((sanction, i) => (
                  <div key={i} className="card bg-yellow-200">
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{sanction.store_name}</p>
                        <p className="text-sm text-base-content text-opacity-60">
                          {sanction.complain}
                        </p>
                        <p className="text-sm text-base-content text-opacity-60">
                          {sanction.sanction}
                        </p>
                      </div>
                      <span className="badge bg-yellow-600 text-white p-3 font-bold">
                        {sanction.business_number}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No unresolved sanctions found.</p>
              )}
            </div>
          </div> */}
        </div>
      </div>
      <EmployeeNavigations />
    </>
  );
};

export default EmployeeTenants;
