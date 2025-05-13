import { useState, useEffect } from "react";
import TenantNavigations from "./TenantNavigations.jsx";
import {
  TbClockDollar,
  TbHistoryToggle,
  TbFilter,
  TbCalendar,
  TbSearch,
} from "react-icons/tb";
import { FaUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import supabase from "./supabaseClient.jsx";

const TenantHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [currentProof, setCurrentProof] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadPayment, setUploadPayment] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [gcashNumber,setGcashNumber] = useState("");
  const [gcashName,setGcashName] = useState("");

  const number = sessionStorage.getItem("number");

  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const { error, data } = await supabase
        .from("Rent")
        .select("*")
        .eq("business_number", number)
        .order("date", { ascending: false });

      if (error) throw error;

      setPaymentData(data || []);
      setFilteredData(data || []);
    } catch (error) {
      console.error("Error fetching payment history:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGcash = async () => {
    try {
      const { error, data } = await supabase
        .from("Gcash")
        .select("*")
        .single();

      if (error) throw error;
setGcashName(data.name);
setGcashNumber(data.number);
    } catch (error) {
      console.error("Error fetching payment history:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchGcash();
  }, []);

  useEffect(() => {
    let result = [...paymentData];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter);
    }

    // Apply date range filter
    if (dateRange.from) {
      result = result.filter(
        (item) => new Date(item.date) >= new Date(dateRange.from)
      );
    }
    if (dateRange.to) {
      result = result.filter(
        (item) => new Date(item.date) <= new Date(dateRange.to)
      );
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (item) =>
          (item.date &&
            item.date.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.date_paid &&
            item.date_paid.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.payment_method &&
            item.payment_method
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (item.total && item.total.toString().includes(searchTerm))
      );
    }

    setFilteredData(result);
  }, [paymentData, statusFilter, dateRange, searchTerm]);

  const handleFileInputChange = (event) => {
    setUploadFile(event.target.files[0]);
  };

  const openUploadModal = (payment) => {
    setUploadPayment(payment);
    setShowUploadModal(true);
    setUploadFile(null);
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setUploadPayment(null);
    setUploadFile(null);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert("Please select a file to upload.");
      return;
    }
    setUploading(true);
    try {
      const fileExt = uploadFile.name.split(".").pop();
      const fileName = `${uploadPayment.id}-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gcash")
        .upload(fileName, uploadFile);
      if (uploadError) throw uploadError;
      const {
        data: { publicUrl },
      } = supabase.storage.from("gcash").getPublicUrl(fileName);
      // Update the payment record with the proof URL
      const { error: updateError } = await supabase
        .from("Rent")
        .update({ proof: publicUrl })
        .eq("id", uploadPayment.id);
      if (updateError) throw updateError;
      fetchPayments();
      closeUploadModal();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleViewProof = (proofUrl) => {
    setCurrentProof(proofUrl);
    setShowProofModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatCurrency = (amount) => {
    if (!amount) return "₱0";
    return `₱${Number(amount).toLocaleString()}`;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "On-Process":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const resetFilters = () => {
    setStatusFilter("all");
    setDateRange({ from: "", to: "" });
    setSearchTerm("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-mono pb-20">
      {/* Header Section */}
      <div className="bg-blue-300 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Payment History</h1>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-1 text-sm bg-info text-white rounded-full"
            >
              <TbFilter className="mr-1" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">
                Filter Payments
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="Search payments..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="Paid">Paid</option>
                  <option value="On-Process">On-Process</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, from: e.target.value })
                    }
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, to: e.target.value })
                    }
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg w-full"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-info text-white rounded-lg w-full"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl px-4 py-4">
        {filteredData.length > 0 ? (
          <div className="space-y-4">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-green-200 transition-colors"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-medium text-lg text-gray-800">
                          Rent Payment
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                          {item.payment_method && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {item.payment_method}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p>
                          Billing period:{" "}
                          <span className="font-medium">
                            {formatDate(item.date)}
                          </span>
                        </p>
                        {item.date_paid && (
                          <p>
                            Paid on:{" "}
                            <span className="font-medium">
                              {formatDate(item.date_paid)}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(item.total)}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        {item.status === "On-Process" && (
                          <button
                            type="button"
                            onClick={() => openUploadModal(item)}
                            className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors"
                            disabled={uploading}
                          >
                            <FaUpload size={14} className="mr-2" />
                            <span className="text-sm font-medium">
                              {item.proof ? "Update Proof" : "Upload Proof"}
                            </span>
                          </button>
                        )}

                        {item.proof && (
                          <button
                            onClick={() => handleViewProof(item.proof)}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <TbSearch size={16} className="mr-2" />
                            <span className="text-sm font-medium">
                              View Proof
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="ml-4">
                      <div className="p-3 rounded-full bg-yellow-100">
                        <TbClockDollar className="text-warning" size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md py-12 text-center">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <TbHistoryToggle className="text-gray-500" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No payments found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm ||
              statusFilter !== "all" ||
              dateRange.from ||
              dateRange.to
                ? "Try adjusting your filters to see more results."
                : "Your payment history will appear here once you make payments."}
            </p>
            {(searchTerm ||
              statusFilter !== "all" ||
              dateRange.from ||
              dateRange.to) && (
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Payment Proof Modal */}
      {showProofModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">
                Payment Proof
              </h3>
              <button
                onClick={() => setShowProofModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto p-4">
              {currentProof.endsWith(".pdf") ? (
                <iframe
                  src={currentProof}
                  className="w-full h-[60vh]"
                  title="Payment Proof PDF"
                />
              ) : (
                <img
                  src={currentProof}
                  alt="Payment Proof"
                  className="max-w-full h-auto mx-auto rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Proof Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg overflow-hidden max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Upload Payment Proof</h3>
              <button
                onClick={closeUploadModal}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <IoClose size={24} />
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gcash Number : {gcashNumber}</label>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gcash Name: {gcashName}</label>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proof File</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileInputChange}
                  className="block w-full border border-gray-300 rounded-lg px-3 py-2"
                  disabled={uploading}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeUploadModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg w-full"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-info text-white rounded-lg w-full"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <TenantNavigations />
    </div>
  );
};

export default TenantHistory;
