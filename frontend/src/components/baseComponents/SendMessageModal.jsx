import React, { useState } from 'react';
import { X, Send, Building, User, Phone, MessageSquare } from 'lucide-react';

const SendMessageModal = ({ isOpen, onClose, onSendMessage }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    customerName: '',
    customerMobile: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(formData);
    // Reset form after submission if needed
    setFormData({
      companyName: '',
      customerName: '',
      customerMobile: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999
      }}
    >
      <div 
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
        style={{
          animation: 'modalSlideIn 0.3s ease-out',
          position: 'relative',
          top: 0
        }}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  Send Message
                </h3>
                <p className="text-blue-100 mt-1">
                  Send a message to your customer
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name Field */}
            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 flex items-center">
                <Building className="w-4 h-4 mr-2 text-blue-500" />
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Customer Name Field */}
            <div className="space-y-2">
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-500" />
                Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter customer name"
                required
              />
            </div>

            {/* Customer Mobile Field */}
            <div className="space-y-2">
              <label htmlFor="customerMobile" className="block text-sm font-medium text-gray-700 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-500" />
                Customer Mobile
              </label>
              <input
                type="tel"
                id="customerMobile"
                name="customerMobile"
                value={formData.customerMobile}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter customer mobile number"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Send Message
            </button>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 rounded-b-3xl">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <p>Your message will be delivered directly to the customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessageModal;