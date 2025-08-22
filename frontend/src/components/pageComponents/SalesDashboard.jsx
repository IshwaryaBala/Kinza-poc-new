import React, { useState, useEffect } from "react";
import SearchFilter from "../baseComponents/SearchFilter";
import SalesRepTable from "../baseComponents/SalesRepTable";
import FeedbackModal from "../baseComponents/FeedbackModal";
import SendMessageModal from "../baseComponents/SendMessageModal"; 
import { TrendingUp } from "lucide-react";
import { salesData } from "../../data/salesData";

const SalesDashboard = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openFeedbackPopup = (salesman) => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px"; // Prevent layout shift
    
    setSelectedFeedback(salesman);
    setIsFeedbackPopupOpen(true);
  };

  const closeFeedbackPopup = () => {
    // Restore body scroll
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
    
    setIsFeedbackPopupOpen(false);
    setSelectedFeedback(null);
  };

  const handleSendMessage = (formData) => {
    // Handle the message sending logic here
    console.log("Sending message:", formData);
    // You can add API call or other logic here
    setIsMessageModalOpen(false);
  };

  return (
    <>
      <div
        className={`relative z-10 p-6 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              Sales Performance Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Monitor your team's performance with real-time insights and customer
              feedback analytics
            </p>
          </div>

          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onAddForm={() => setIsMessageModalOpen(true)} 
          />

          <SalesRepTable
            salesData={salesData}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            openFeedbackPopup={openFeedbackPopup}
          />
        </div>
      </div>

      {/* Feedback Modal rendered outside the dashboard container */}
      {isFeedbackPopupOpen && selectedFeedback && (
        <FeedbackModal
          selectedFeedback={selectedFeedback}
          closeFeedbackPopup={closeFeedbackPopup}
        />
      )}

      {/* Send Message Modal */}
      <SendMessageModal 
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default SalesDashboard;