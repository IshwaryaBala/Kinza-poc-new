import React from 'react';
import { X, CheckCircle, XCircle, MessageSquare, Calendar, MapPin, Phone, Star, Award } from 'lucide-react';

const FeedbackModal = ({ selectedFeedback, closeFeedbackPopup }) => {
  const getSatisfactionColor = (satisfaction) => {
    switch (satisfaction?.toLowerCase()) {
      case 'excellent': return 'text-emerald-700 bg-gradient-to-r from-emerald-100 to-emerald-200 border border-emerald-300';
      case 'very good': return 'text-blue-700 bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300';
      case 'good': return 'text-amber-700 bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300';
      case 'average': return 'text-orange-700 bg-gradient-to-r from-orange-100 to-orange-200 border border-orange-300';
      case 'poor': return 'text-red-700 bg-gradient-to-r from-red-100 to-red-200 border border-red-300';
      default: return 'text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300';
    }
  };

  const getVisitedIcon = (visited) => {
    return visited === 'Yes' ? 
      <CheckCircle className="w-5 h-5 text-emerald-600" /> : 
      <XCircle className="w-5 h-5 text-red-500" />;
  };

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
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
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
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {selectedFeedback.avatar}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {selectedFeedback.salesmanName}
                </h3>
                <p className="text-blue-100 mt-1 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  {selectedFeedback.feedback.length} customer responses • {selectedFeedback.performance}% performance
                </p>
              </div>
            </div>
            <button
              onClick={closeFeedbackPopup}
              className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Modal Content - Now with proper scrolling */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-8 space-y-6">
            {selectedFeedback.feedback.map((feedback, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Feedback Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-xl font-bold text-gray-900">
                        {feedback.customerName}
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {feedback.visitDate}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-red-500" />
                        {feedback.location}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-green-500" />
                        {feedback.phone}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border">
                    {feedback.timestamp}
                  </span>
                </div>

                {/* Response Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${feedback.responses.visited === 'Yes' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                        {getVisitedIcon(feedback.responses.visited)}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase">Visit Confirmed</p>
                        <p className="text-sm font-bold text-gray-900">{feedback.responses.visited}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${feedback.responses.orderPlaced === 'Yes' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                        {getVisitedIcon(feedback.responses.orderPlaced)}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase">Order Placed</p>
                        <p className="text-sm font-bold text-gray-900">{feedback.responses.orderPlaced}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Star className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase">Satisfaction</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getSatisfactionColor(feedback.responses.satisfaction)}`}>
                          {feedback.responses.satisfaction}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {feedback.comments && (
                  <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100 flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Customer Feedback</p>
                        <blockquote className="text-gray-700 italic border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded-r-lg">
                          "{feedback.comments}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer - Fixed at bottom */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <span>Excellent feedback</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Good performance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <span>Needs attention</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={closeFeedbackPopup}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;