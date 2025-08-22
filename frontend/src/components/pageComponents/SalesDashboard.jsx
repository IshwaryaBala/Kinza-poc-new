import React, { useState, useEffect } from "react";
import SearchFilter from "../baseComponents/SearchFilter";
import SalesRepTable from "../baseComponents/SalesRepTable";
import FeedbackModal from "../baseComponents/FeedbackModal";
import SendMessageModal from "../baseComponents/SendMessageModal"; // Import the new modal
import { TrendingUp } from "lucide-react";

const SalesDashboard = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // State for message modal
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sample data with enhanced information
  const salesData = [
    {
      id: 1,
      salesmanName: "John Smith",
      email: "john.smith@company.com",
      company: "TechSolutions Inc",
      totalVisits: 5,
      completedVisits: 4,
      avatar: "JS",
      performance: 85,
      region: "Western",
      ordersThisMonth: 12,
      revenue: 45000,
      feedback: [
        {
          customerName: "ABC Corp",
          visitDate: "2025-08-22",
          location: "Mumbai, MH",
          phone: "+91 98765 43210",
          responses: {
            visited: "Yes",
            orderPlaced: "Yes",
            satisfaction: "Excellent",
          },
          comments:
            "Very professional service. Will continue working together.",
          timestamp: "2025-08-22 18:30",
        },
        {
          customerName: "XYZ Industries",
          visitDate: "2025-08-22",
          location: "Chennai, TN",
          phone: "+91 87654 32109",
          responses: {
            visited: "Yes",
            orderPlaced: "No",
            satisfaction: "Good",
          },
          comments: "Need better pricing options for next quarter.",
          timestamp: "2025-08-22 19:15",
        },
        {
          customerName: "Global Enterprises",
          visitDate: "2025-08-22",
          location: "Bangalore, KA",
          phone: "+91 76543 21098",
          responses: {
            visited: "Yes",
            orderPlaced: "Yes",
            satisfaction: "Very Good",
          },
          comments: "Quick service and good product quality.",
          timestamp: "2025-08-22 20:00",
        },
      ],
    },
    {
      id: 2,
      salesmanName: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      company: "TechSolutions Inc",
      totalVisits: 6,
      completedVisits: 6,
      avatar: "SJ",
      performance: 95,
      region: "Eastern",
      ordersThisMonth: 18,
      revenue: 68000,
      feedback: [
        {
          customerName: "Metro Solutions",
          visitDate: "2025-08-22",
          location: "Delhi, DL",
          phone: "+91 65432 10987",
          responses: {
            visited: "Yes",
            orderPlaced: "Yes",
            satisfaction: "Excellent",
          },
          comments: "Outstanding presentation and follow-up.",
          timestamp: "2025-08-22 17:45",
        },
        {
          customerName: "Prime Industries",
          visitDate: "2025-08-22",
          location: "Pune, MH",
          phone: "+91 54321 09876",
          responses: {
            visited: "No",
            orderPlaced: "No",
            satisfaction: "N/A",
          },
          comments: "Salesman didn't show up at scheduled time.",
          timestamp: "2025-08-22 16:30",
        },
      ],
    },
    {
      id: 3,
      salesmanName: "Mike Wilson",
      email: "mike.wilson@company.com",
      company: "TechSolutions Inc",
      totalVisits: 4,
      completedVisits: 3,
      avatar: "MW",
      performance: 72,
      region: "Central",
      ordersThisMonth: 8,
      revenue: 32000,
      feedback: [
        {
          customerName: "Sunrise Corp",
          visitDate: "2025-08-22",
          location: "Hyderabad, TS",
          phone: "+91 43210 98765",
          responses: {
            visited: "Yes",
            orderPlaced: "No",
            satisfaction: "Average",
          },
          comments: "Need more competitive pricing.",
          timestamp: "2025-08-22 19:30",
        },
      ],
    },
    {
      id: 4,
      salesmanName: "Mike Wilson",
      email: "mike.wilson@company.com",
      company: "TechSolutions Inc",
      totalVisits: 4,
      completedVisits: 3,
      avatar: "MW",
      performance: 72,
      region: "Central",
      ordersThisMonth: 8,
      revenue: 32000,
      feedback: [
        {
          customerName: "Sunrise Corp",
          visitDate: "2025-08-22",
          location: "Hyderabad, TS",
          phone: "+91 43210 98765",
          responses: {
            visited: "Yes",
            orderPlaced: "No",
            satisfaction: "Average",
          },
          comments: "Need more competitive pricing.",
          timestamp: "2025-08-22 19:30",
        },
      ],
    },
    {
      id: 5,
      salesmanName: "Mike Wilson",
      email: "mike.wilson@company.com",
      company: "TechSolutions Inc",
      totalVisits: 4,
      completedVisits: 3,
      avatar: "MW",
      performance: 72,
      region: "Central",
      ordersThisMonth: 8,
      revenue: 32000,
      feedback: [
        {
          customerName: "Sunrise Corp",
          visitDate: "2025-08-22",
          location: "Hyderabad, TS",
          phone: "+91 43210 98765",
          responses: {
            visited: "Yes",
            orderPlaced: "No",
            satisfaction: "Average",
          },
          comments: "Need more competitive pricing.",
          timestamp: "2025-08-22 19:30",
        },
      ],
    },
    {
      id: 6,
      salesmanName: "Mike Wilson",
      email: "mike.wilson@company.com",
      company: "TechSolutions Inc",
      totalVisits: 4,
      completedVisits: 3,
      avatar: "MW",
      performance: 72,
      region: "Central",
      ordersThisMonth: 8,
      revenue: 32000,
      feedback: [
        {
          customerName: "Sunrise Corp",
          visitDate: "2025-08-22",
          location: "Hyderabad, TS",
          phone: "+91 43210 98765",
          responses: {
            visited: "Yes",
            orderPlaced: "No",
            satisfaction: "Average",
          },
          comments: "Need more competitive pricing.",
          timestamp: "2025-08-22 19:30",
          rating: 3,
        },
      ],
    },
  ];

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