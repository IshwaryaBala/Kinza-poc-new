import React from 'react';
import { MapPin, Users, Eye, ChevronRight, Mail } from 'lucide-react';

const SalesRepTable = ({ salesData, searchTerm, filterStatus, openFeedbackPopup }) => {
  const getPerformanceBadge = (performance) => {
    if (performance >= 90) return { text: 'Excellent', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    if (performance >= 80) return { text: 'Good', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    if (performance >= 70) return { text: 'Average', color: 'bg-amber-100 text-amber-800 border-amber-200' };
    return { text: 'Needs Improvement', color: 'bg-red-100 text-red-800 border-red-200' };
  };

  const filteredSalesData = salesData.filter(salesman => {
    const matchesSearch = salesman.salesmanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salesman.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'high') return matchesSearch && salesman.performance >= 85;
    if (filterStatus === 'medium') return matchesSearch && salesman.performance >= 70 && salesman.performance < 85;
    if (filterStatus === 'low') return matchesSearch && salesman.performance < 70;
    
    return matchesSearch;
  });

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sales Representatives</h2>
            <p className="text-gray-600 mt-1">Performance overview and customer feedback</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">{filteredSalesData.length} representatives</span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50/80">
            <tr>
              <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Representative</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Region</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Visit Progress</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSalesData.map((salesman, index) => {
              const badge = getPerformanceBadge(salesman.performance);
              return (
                <tr 
                  key={salesman.id} 
                  className="hover:bg-blue-50/50 transition-all duration-200 group"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 relative">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                          <span className="text-sm font-bold text-white">{salesman.avatar}</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {salesman.salesmanName}
                        </div>
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                          <Mail className="w-3 h-3 mr-1" />
                          {salesman.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-6">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {salesman.region}
                    </div>
                  </td>
                  
                  <td className="px-6 py-6">
                    <div className="text-sm text-gray-900 mb-2">
                      <span className="font-medium">{salesman.completedVisits}</span>
                      <span className="text-gray-500"> / {salesman.totalVisits} visits</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-6">
                    <button
                      onClick={() => openFeedbackPopup(salesman)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                    >
                      View Details
                      <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                        {salesman.feedback.length}
                      </span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesRepTable;