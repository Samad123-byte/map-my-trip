import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminApi';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { formatPKR } from '../../utils/currencyUtils';


const CustomToursList = () => {
  const [customTours, setCustomTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursData, statsData] = await Promise.all([
          adminService.getAllCustomTours(),
          adminService.getCustomTourStats()
        ]);
        setCustomTours(toursData);
        setStats(statsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching custom tours:', err);
        setError('Failed to load custom tours. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (tourId) => {
    if (!window.confirm('Are you sure you want to delete this custom tour request?')) return;
    
    try {
      await adminService.deleteCustomTour(tourId);
      setCustomTours(customTours.filter(tour => tour._id !== tourId));
    } catch (err) {
      console.error('Error deleting custom tour:', err);
      setError('Failed to delete custom tour. Please try again.');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md';
      case 'Reviewing':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md';
      case 'Quoted':
        return 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md';
      case 'Confirmed':
        return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md';
      case 'Rejected':
        return 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-600 text-white shadow-md';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 rounded-full absolute top-0 left-0 border-t-transparent animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-rose-600 p-4">
              <div className="flex items-center text-white">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Error Loading Data</h3>
                  <p className="text-white/90 text-sm">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Custom Tour Requests
            </h1>
            <p className="text-slate-600 text-lg">Manage and track custom tour inquiries</p>
          </div>
          
          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="group bg-white backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-700 mb-2 flex items-center">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl mr-3 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      Total Requests
                    </h2>
                    <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stats.totalRequests}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl mr-3 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  Status Distribution
                </h2>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(stats.statusDistribution || {}).map(([status, count]) => (
                    <span key={status} className={`${getStatusBadgeClass(status)} px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105`}>
                      {status}: {count}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="group bg-white backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-xl mr-3 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Popular Destinations
                </h2>
                <div className="space-y-3">
                  {stats.popularDestinations?.slice(0, 3).map((dest, index) => (
                    <div key={index} className="flex justify-between items-center bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-xl shadow-sm border border-slate-200/50">
                      <span className="text-slate-800 font-semibold text-sm">{dest._id}</span>
                      <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                        {dest.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Tour Requests Table */}
          <div className="bg-white backdrop-blur-sm bg-white/80 border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Tour Requests Overview</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Destinations</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Date Range</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Budget</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {customTours.map(tour => (
                    <tr key={tour._id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-4 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 h-12 w-12 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                            <span className="text-white font-bold text-lg">
                              {tour.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{tour.name}</div>
                            <div className="text-sm text-slate-600 flex items-center mt-1">
                              <div className="bg-slate-200 p-1 rounded-md mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                              {tour.email}
                            </div>
                            <div className="text-sm text-slate-600 flex items-center mt-1">
                              <div className="bg-slate-200 p-1 rounded-md mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              {tour.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-sm text-slate-900 font-semibold">
                          {tour.preferredDestinations.slice(0, 2).join(', ')}
                          {tour.preferredDestinations.length > 2 && '...'}
                        </div>
                        <div className="text-sm text-slate-600 flex items-center mt-2">
                          <div className="bg-slate-200 p-1 rounded-md mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          {tour.numberOfTravelers} travelers
                        </div>
                        <div className="text-sm text-slate-600 flex items-center mt-1">
                          <div className="bg-slate-200 p-1 rounded-md mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          {tour.accommodationPreference}
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="text-sm text-slate-900 font-semibold flex items-center">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-lg mr-2 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <div>{format(new Date(tour.startDate), 'MMM d, yyyy')} -</div>
                            <div>{format(new Date(tour.endDate), 'MMM d, yyyy')}</div>
                          </div>
                        </div>
                        <div className="text-sm text-slate-500 mt-1 pl-8">
                          {Math.ceil((new Date(tour.endDate) - new Date(tour.startDate)) / (1000 * 60 * 60 * 24))} days
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">{formatPKR(tour.budget)}</div>
                        {tour.quotedPrice && (
                          <div className="text-sm text-emerald-600 font-semibold flex items-center mt-2 bg-emerald-50 px-2 py-1 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatPKR(tour.quotedPrice)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className={`px-4 py-2 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusBadgeClass(tour.status)} transition-all duration-200 hover:scale-105`}>
                          {tour.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link 
                            to={`/admin/custom-tours/${tour._id}`} 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2.5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <FiEye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(tour._id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2.5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToursList;