import EmployeeNavigations from "./EmployeeNavigations.jsx";
import { ImHistory } from "react-icons/im";
import { FaSortAmountDown } from "react-icons/fa";

const EmployeeHistory = () => {
  return (
    <>
      <div className="font-mono container mx-auto w-full p-5 space-y-6">
        <div className="space-y-2">
          <div className="card mt-3">
            <div className="flex justify-center content-center mb-8 gap-2">
              <>
                <ImHistory size={29} className="text-green-800" />
                <h2 className="text-2xl font-semibold">Scan History</h2>
              </>
            </div>
            <hr />
          </div>
          <div className="flex justify-between">
            <label className="input flex">
              <input type="date" className="grow" />
            </label>
            <select className="select">
              <option disabled selected>
                Dept./Section
              </option>
              <option>Dept. 1</option>
              <option>Dept. 2</option>
            </select>
          </div>

          <div className="max-h-screen">
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="card bg-green-300">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Department {4 + i}B</p>
                      <p className="text-sm text-base-content text-opacity-60">
                        Gaisano Mall - Butuan
                      </p>
                      <p className="text-sm text-base-content text-opacity-60">
                        Date: June 30, 2023
                      </p>
                    </div>
                    <span className="badge bg-green-700 text-white p-3 font-bold">
                      Scanned
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

export default EmployeeHistory;
