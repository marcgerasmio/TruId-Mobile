import EmployeeNavigations from "./EmployeeNavigations.jsx";
import { ImHistory } from "react-icons/im";
import supabase from "./supabaseClient.jsx";
import { useEffect, useState } from "react";

const EmployeeHistory = () => {
  const [history, setHistoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const name = sessionStorage.getItem("name");

  useEffect(() => {
    const fetch_history = async () => {
      try {
        const { error, data } = await supabase
          .from("Rent")
          .select("*")
          .eq("employee_name", name)
          .eq("status", "Paid");

        if (error) throw error;
        setHistoryData(data);
      } catch (error) {
        alert("An unexpected error occurred.");
        console.error("Fetch error:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetch_history();
  }, []);

  const filteredHistory = history.filter((item) =>
    item.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <div className="font-mono container mx-auto px-4 py-5">
        <div className="mb-3 text-center">
          <div className="inline-flex items-center gap-2 text-green-700">
            <ImHistory size={28} />
            <h1 className="text-2xl font-bold tracking-tight">Scan History</h1>
          </div>
          <p className="text-gray-600 mt-1 text-sm">
            Filtered by department/section
          </p>
        </div>

        <div className="sticky top-0 z-10 bg-white py-3">
          <select
            className="select select-bordered w-full sm:w-64"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          >
            <option value="">All Departments</option>
            <option value="Meat">Meat</option>
            <option value="Fish">Fish</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Groceries">Groceries</option>
            <option value="Non Food">Non Food</option>
          </select>
        </div>

        <div className="mt-4 space-y-4 overflow-y-auto max-h-[calc(100vh-14rem)] pr-1">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start border-l-4 border-green-600"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.store_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Rent Date: {item.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    Paid: {item.date_paid}
                  </p>
                </div>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No history available.</p>
          )}
        </div>
      </div>

      <EmployeeNavigations />
    </>
  );
};

export default EmployeeHistory;
