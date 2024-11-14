import TenantNavigations from "./TenantNavigations.jsx";
import { TbClockDollar } from "react-icons/tb";
import { TbHistoryToggle } from "react-icons/tb";
import { FaSortAmountDown } from "react-icons/fa";

const TenantHistory = () => {
  return (
    <>
      <div className="font-mono container mx-auto w-full p-5 space-y-6">
        <div className="space-y-2">
          <div className="card mt-3">
            <div className="flex justify-center content-center mb-8 gap-2">
              <>
                <TbHistoryToggle size={29} className="text-green-700" />
                <h2 className="text-2xl font-semibold">Payment History</h2>
              </>
            </div>
            <hr />
          </div>
          <div className="flex justify-between">
            <label className="input flex">
              <input type="date" className="grow" />
            </label>
            <FaSortAmountDown className="mt-3 me-2" size={20} />
          </div>

          <div className="max-h-screen">
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
              {[...Array(5)].map((_, i) => (
                <div className="card shadow-md border-2 border-green-400">
                  <div className="flex justify-between p-5">
                    <div>
                      <p className="font-semibold">Rent</p>
                      <p className="text-sm text-gray-500">
                        Paid on Apr 1, 2023
                      </p>
                      <span className="font-semibold">$1,200</span>
                    </div>
                    <TbClockDollar
                      size={32}
                      className="me-3 mt-2 text-green-600"
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

export default TenantHistory;
