import TenantNavigations from "./TenantNavigations.jsx";
import { TbClockDollar } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { TbHistoryToggle } from "react-icons/tb";
import { TbCalendarDue } from "react-icons/tb";
import supabase from "./supabaseClient.jsx";
import { useState, useEffect } from 'react';
import { TiWarningOutline } from "react-icons/ti";
import EmployeeNavigations from "./EmployeeNavigations.jsx";

const Payment = () => {
const [userdata, setUserData] = useState([]);
const [sanction, setSanction] = useState([]);
const [pendingdata, setPendingData] = useState([]);
const [completeddata, setCompletedData] = useState([]);
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [selectedPayment, setSelectedPayment] = useState(null);
const [paymentMethod, setPaymentMethod] = useState('Cash');
const number = sessionStorage.getItem('scannedQRCode');
const totalDue = pendingdata.reduce((total, item) => total + Number(item.total || 0), 0);
const employee_name = sessionStorage.getItem("name");

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); 
    const day = String(today.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  }
  

const fetch_user = async () => {
  try {
    const { error, data } = await supabase
      .from('Tenant')
      .select('*')
      .eq('business_number', number)
      .single();
    setUserData(data);
    console.log(data);
  } catch (error) {
    alert("An unexpected error occurred.");
    console.error('Error during registration:', error.message);
  }
};

const fetch_pending = async () => {
  try {
    const { error, data } = await supabase
      .from('Rent')
      .select('*')
      .eq('business_number', number)
      .eq('status', 'Pending')

    setPendingData(data);
  } catch (error) {
    alert("An unexpected error occurred.");
    console.error('Error during registration:', error.message);
  }
};

const fetch_sanction = async () => {
  try {
    const { error, data } = await supabase
      .from('Sanction')
      .select('*')
      .eq('business_number', number)
      .eq('status', 'Unresolved')

      setSanction(data);
  } catch (error) {
    alert("An unexpected error occurred.");
    console.error('Error during registration:', error.message);
  }
};

const pay_rent = async (item) => {
    setSelectedPayment(item);
    setShowPaymentModal(true);
}

const confirmPayment = async () => {
    try {
        const { data } = await supabase
          .from("Rent")
          .update([
            {
              employee_name,
              date_paid: getCurrentDate(),
              status: paymentMethod === 'Cash' ? 'Paid' : 'On-Process',
              payment_method: paymentMethod
            },
          ])
          .eq("id", selectedPayment.id);
        setShowPaymentModal(false);
        window.location.reload();
      } catch (error) {
        alert("Error Saving Data.");
      }
}

const settle_sanction = async (item) => {
    console.log(item);
    console.log(getCurrentDate());
    try {
        const { data } = await supabase
          .from("Sanction")
          .update([
            {
              status : 'Cleared'
            },
          ])
          .eq("id", item.id);
        window.location.reload();
      } catch (error) {
        alert("Error Saving Data.");
      }
}


useEffect(() => {
  fetch_user();
  fetch_pending();
  fetch_sanction();
}, []);
  return (
    <>
      <div className="font-mono container mx-auto w-full p-4 space-y-6">
        <div className="card flex items-center space-x-4 p-2">
          <div className="flex justify-center content-center mt-2">
            <h3 className="text-2xl font-extrabold">{userdata.store_name}</h3>
          </div>
          <p className="text-md text-gray-500">{userdata.business_type} Section</p>
          <p className="text-md text-gray-500">Tenant Name: {userdata.tenant_name}</p>
        </div>
        <hr />

        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold flex items-center text-red-600">
              <TbCalendarDue className="mr-2" />
              Due Payment/s
            </h3>
          </div>
          {pendingdata.map((item, index) => (
              <div key={index} className="card shadow-md border-2 border-red-600">
              <div className="flex justify-between p-5">
                <div>
                  <p className="font-semibold">{item.date}</p>
                  <span className="font-semibold">₱{item.total}</span>
                  <p className="text-sm text-base-content text-opacity-60">
                      {item.clearance}
                    </p>
                </div>
               <button 
                 onClick={() => pay_rent(item)}
                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
               >
                 Pay
               </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <span className="font-semibold">Total Due</span>
            <span className="font-semibold text-lg">₱{totalDue}</span>
          </div>
  
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold flex items-center text-yellow-700">
              <TbHistoryToggle className="mr-2" />
              Unsettled Sanctions
            </h3>
          </div>
          <div className="max-h-screen">
          <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
            {sanction.map((item, index) => (
              <div className="card shadow-md border-2 border-yellow-500" key={index}>
                <div className="flex justify-between p-5">
                  <div>
                    <p className="font-semibold">{item.complain}</p>
                    <p className="text-sm text-gray-500">{item.sanction}</p>
                    <span className="font-semibold">{item.clearance}</span>
                  </div>
                  <button onClick={() => settle_sanction(item)}>Settle</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4 text-black">Payment Details</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="font-semibold">Date:</span>
                <span>{selectedPayment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Stall Rent:</span>
                <span>₱{selectedPayment.rent || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Water Bill:</span>
                <span>₱{selectedPayment.water_bill || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Electric Bill:</span>
                <span>₱{selectedPayment.electric_bill || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">₱{selectedPayment.total}</span>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode of Payment
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Cash">Cash</option>
                  <option value="Gcash">Gcash</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmPayment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <EmployeeNavigations />
    </>
  );
};

export default Payment;
