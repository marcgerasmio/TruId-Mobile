import TenantNavigations from "./TenantNavigations.jsx";
import { PiSealWarningFill } from "react-icons/pi";
import { FaSortAmountDown } from "react-icons/fa";
import { TiWarningOutline } from "react-icons/ti";
import supabase from "./supabaseClient.jsx";
import { useEffect, useState } from "react";

const TenantSanction = () => {
  const [pendingData, setPendingData] = useState([]);
  const number = sessionStorage.getItem('number');

  const fetch_sanction = async () => {
    try {
      const { error, data } = await supabase
        .from('Sanction')
        .select('*')
        .eq('business_number', number)
        .eq('status', 'Unresolved');
      
      if (error) {
        throw error;
      }
      
      setPendingData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during registration:', error.message);
    }
  };

  useEffect(() => {
    fetch_sanction();
  }, []);

  return (
    <>
      <div className="font-mono container mx-auto w-full p-5 space-y-6">
        <div className="space-y-2">
          <div className="card mt-3">
            <div className="flex justify-center content-center mb-8 gap-1">
              <PiSealWarningFill size={30} className="text-yellow-600" />
              <h2 className="text-2xl font-semibold">Tenant Sanction</h2>
            </div>
            <hr />
          </div>
          <div className="max-h-screen">
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
              {pendingData.map((item, index) => (
                <div key={index} className="card shadow-md border-2 border-yellow-600">
                  <div className="flex justify-between p-5">
                    <div>
                      <p className="font-semibold">{item.complain}</p>
                      <span className="font-semibold">{item.sanction}</span>
                      <p className="text-sm text-base-content text-opacity-60">
                          {item.clearance}
                        </p>
                    </div>
                    <TiWarningOutline
                      size={32}
                      className="me-3 mt-2 text-yellow-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TenantNavigations />
    </>
  );
};

export default TenantSanction;
