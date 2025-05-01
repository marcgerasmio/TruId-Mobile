import TenantNavigations from "./TenantNavigations.jsx";
import { TbClockDollar } from "react-icons/tb";
import { TbHistoryToggle } from "react-icons/tb";
import { FaSortAmountDown } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import supabase from "./supabaseClient.jsx";
import { useState, useEffect } from "react";

const TenantHistory = () => {
  const [completeddata, setCompletedData] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [currentProof, setCurrentProof] = useState('');
  const number = sessionStorage.getItem('number');

  const fetch_completed = async () => {
    try {
      const { error, data } = await supabase
        .from('Rent')
        .select('*')
        .eq('business_number', number);
      
      if (error) {
        throw error;
      }
      
      setCompletedData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during registration:', error.message);
    }
  };

  useEffect(() => {
    fetch_completed();
  }, []);

  const handleFileUpload = async (event, payment) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${payment.id}-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gcash')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gcash')
        .getPublicUrl(fileName);

      // Update the payment record with the proof URL
      const { error: updateError } = await supabase
        .from('Rent')
        .update({ proof: publicUrl,
        })
        .eq('id', payment.id);

      if (updateError) throw updateError;

      // Refresh the data
      fetch_completed();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleViewProof = (proofUrl) => {
    setCurrentProof(proofUrl);
    setShowProofModal(true);
  };

  return (
    <>
      <div className="font-mono container mx-auto w-full p-5 space-y-6">
        <div className="space-y-2">
          <div className="card mt-3">
            <div className="flex justify-center content-center mb-8 gap-2">
              <TbHistoryToggle size={29} className="text-green-700" />
              <h2 className="text-2xl font-semibold">Payment History</h2>
            </div>
            <hr />
          </div>
          {/* <div className="flex justify-between">
            <label className="input flex">
              <input type="date" className="grow" />
            </label>
            <FaSortAmountDown className="mt-3 me-2" size={20} />
          </div> */}

          <div className="max-h-screen">
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
              {completeddata.map((item, index) => (
                <div key={index} className="card shadow-md border-2 border-green-400">
                  <div className="flex justify-between p-5">
                    <div>
                      <p className="font-semibold">Rent for {item.date}</p>
                      <p className="text-sm text-gray-500">Paid on {item.date_paid}</p>
                      <span className="font-semibold">₱{item.total}</span>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-sm ${
                          item.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          item.status === 'On-Process' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                        {item.payment_method && (
                          <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                            {item.payment_method}
                          </span>
                        )}
                        {item.status === 'On-Process' && (
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileUpload(e, item)}
                              disabled={uploading}
                            />
                            <span className="px-2 py-1 rounded text-sm bg-purple-100 text-purple-800 flex items-center gap-1">
                              <FaUpload size={12} />
                              {item.proof ? 'Update Proof' : 'Upload Proof'}
                            </span>
                          </label>
                        )}
                      </div>
                      {item.proof && (
                        <div className="mt-2">
                          <button 
                            onClick={() => handleViewProof(item.proof)}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View Proof
                          </button>
                        </div>
                      )}
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

      {/* Proof Modal */}
      {showProofModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Payment Proof</h3>
              <button 
                onClick={() => setShowProofModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto">
              {currentProof.endsWith('.pdf') ? (
                <iframe 
                  src={currentProof} 
                  className="w-full h-[70vh]"
                  title="Payment Proof PDF"
                />
              ) : (
                <img 
                  src={currentProof} 
                  alt="Payment Proof" 
                  className="max-w-full h-auto mx-auto"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <TenantNavigations />
    </>
  );
};

export default TenantHistory;
