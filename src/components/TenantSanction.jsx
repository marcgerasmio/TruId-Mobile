import TenantNavigations from "./TenantNavigations.jsx";
import { PiSealWarningFill } from "react-icons/pi";
import { FaSortAmountDown } from "react-icons/fa";
import { TiWarningOutline } from "react-icons/ti";

const TenantSanction = () => {
  return (
    <>
      <div className="font-mono container mx-auto w-full p-5 space-y-6">
        <div className="space-y-2">
          <div className="card mt-3">
            <div className="flex justify-center content-center mb-8 gap-1">
              <>
                <PiSealWarningFill size={30} className="text-yellow-600" />
                <h2 className="text-2xl font-semibold">Tenant Sanction</h2>
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
                <div className="card shadow-md border-2 border-yellow-600">
                  <div className="flex justify-between p-5">
                    <div>
                      <p className="font-semibold">Sanction 1</p>
                      <p className="text-sm text-gray-500">
                        Unpaid on Apr 1, 2023
                      </p>
                      <span className="font-semibold">$1,200</span>
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
