import TenantNavigations from "./TenantNavigations.jsx";
import { PiSealWarningFill } from "react-icons/pi";
import { TiWarningOutline } from "react-icons/ti";
import supabase from "./supabaseClient.jsx";
import { useEffect, useState } from "react";

const TenantSanction = () => {
  const [pendingData, setPendingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const number = sessionStorage.getItem("number");

  const fetch_sanction = async () => {
    setIsLoading(true);
    try {
      const { error, data } = await supabase
        .from("Sanction")
        .select("*")
        .eq("business_number", number)
        .eq("status", "Unresolved");

      if (error) {
        throw error;
      }

      setPendingData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetch_sanction();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="font-mono container mx-auto w-full p-5 space-y-6">
        <div className="space-y-3">
          <div className="card mt-2">
            <div className="mb-3 text-center">
              <div className="inline-flex items-center gap-2 text-warning">
                <PiSealWarningFill size={28} />
                <h1 className="text-2xl font-bold tracking-tight">Sanctions</h1>
              </div>
            </div>
            <p className="text-gray-600 text-sm text-center">
              List of all of your sanctions
            </p>
          </div>

          {/* <div className="flex justify-center content-center">
            <span className="italic text-gray-400">For future purposes...</span>
          </div> */}

          <div className="max-h-screen">
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
              {pendingData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg items-start border-l-4 border-yellow-600"
                >
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
