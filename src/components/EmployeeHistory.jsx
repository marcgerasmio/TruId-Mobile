import EmployeeNavigations from "./EmployeeNavigations.jsx";
import { ImHistory } from "react-icons/im";
import { FaSortAmountDown } from "react-icons/fa";
import supabase from "./supabaseClient.jsx";
import { useEffect, useState } from "react";

const EmployeeHistory = () => {
  const [history, setHistoryData] = useState([]);
  const name = sessionStorage.getItem('name');
  const [searchQuery, setSearchQuery] = useState('');

  const fetch_history = async () => {
    try {
      const { error, data } = await supabase
        .from('Rent')
        .select('*')
        .eq('employee_name', name)
        .eq('status', 'Paid');

      if (error) throw error;
      setHistoryData(data);
      console.log(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during fetching history:', error.message);
    }
  };

  const filteredHistory = history.filter(history =>
    history.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetch_history();
  }, []);

  return (
    <>
      <div className="font-mono container mx-auto w-full p-5 space-y-6">
        <div className="space-y-2">
          <div className="card mt-3">
            <div className="flex justify-center content-center mb-8 gap-2">
              <ImHistory size={29} className="text-green-800" />
              <h2 className="text-2xl font-semibold">Scan History</h2>
            </div>
            <hr />
          </div>
          <div className="flex justify-between">
            <select className="select"
             onChange={(e) => setSearchQuery(e.target.value)}>
              <option value="">Dept./Section</option>
              <option value="Meat">Meat</option>
              <option value="Fish">Fish</option>
              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Groceries">Groceries</option>
              <option value="Non Food">Non Food</option>
            </select>
          </div>

          <div className="max-h-screen">
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
              {filteredHistory && filteredHistory.length > 0 ? (
                filteredHistory.map((item, index) => (
                  <div key={index} className="card bg-green-300">
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.store_name}</p>
                        <p className="text-sm text-base-content text-opacity-60">
                          Rent for {item.date}
                        </p>
                        <p className="text-sm text-base-content text-opacity-60">
                          Date Paid: {item.date_paid}
                        </p>
                      </div>
                      <span className="badge bg-green-700 text-white p-3 font-bold">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No history available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <EmployeeNavigations />
    </>
  );
};

export default EmployeeHistory;
