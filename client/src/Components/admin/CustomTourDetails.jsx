import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminApi';
import { format } from 'date-fns';
import { FiArrowLeft, FiSave, FiTrash2, FiUser, FiCalendar, FiPhone, FiMail, FiMapPin, FiUsers, FiDollarSign, FiHome, FiActivity, FiFileText } from 'react-icons/fi';
import { formatPKR } from '../../utils/currencyUtils';


const CustomTourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    adminNotes: '',
    quotedPrice: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const data = await adminService.getCustomTourById(id);
        setTour(data);
        setFormData({
          status: data.status,
          adminNotes: data.adminNotes || '',
          quotedPrice: data.quotedPrice || ''
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tour details:', err);
        setError('Failed to load tour details. Please try again.');
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quotedPrice' ? (value === '' ? '' : Number(value)) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updatedTour = await adminService.updateCustomTour(id, formData);
      setTour(updatedTour);
      setIsSaving(false);
      alert('Tour updated successfully!');
    } catch (err) {
      console.error('Error updating tour:', err);
      setError('Failed to update tour. Please try again.');
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this custom tour request?')) return;
    
    try {
      await adminService.deleteCustomTour(id);
      navigate('/admin/custom-tours');
    } catch (err) {
      console.error('Error deleting tour:', err);
      setError('Failed to delete tour. Please try again.');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200 shadow-sm';
      case 'Reviewing':
        return 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border border-amber-200 shadow-sm';
      case 'Quoted':
        return 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border border-purple-200 shadow-sm';
      case 'Confirmed':
        return 'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm';
      case 'Rejected':
        return 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200 shadow-sm';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200 shadow-sm';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-opacity-20 border-t-blue-600 mx-auto"></div>
          <p className="text-slate-600 mt-4 text-center font-medium">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl border-l-8 border-red-500 p-8 max-w-md w-full" role="alert">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-red-800 font-bold text-lg">Something went wrong</h3>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl border-l-8 border-amber-500 p-8 max-w-md w-full">
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-amber-800 font-bold text-lg">No Data Found</h3>
              <p className="text-amber-600 mt-1">Tour information could not be located.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <button
            onClick={() => navigate('/admin/custom-tours')}
            className="group flex items-center text-slate-700 bg-white hover:bg-slate-50 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" /> 
            Back to Custom Tours
          </button>
          <div className="flex space-x-3">
            <button
              onClick={handleDelete}
              className="group flex items-center text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FiTrash2 className="mr-2 group-hover:rotate-12 transition-transform duration-300" /> 
              Delete Request
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Custom Tour Request #{id}</h2>
                  <p className="text-blue-100 text-lg">Submitted on {format(new Date(tour.createdAt), 'MMMM d, yyyy')}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeClass(tour.status)}`}>
                  {tour.status}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Customer & Tour Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Customer Information */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-inner border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                  <div className="bg-blue-500 p-2 rounded-lg mr-3">
                    <FiUser className="text-white text-lg" />
                  </div>
                  Customer Information
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: FiUser, label: 'Full Name', value: tour.name },
                    { icon: FiMail, label: 'Email Address', value: tour.email },
                    { icon: FiPhone, label: 'Phone Number', value: tour.phone }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 mr-4 group-hover:shadow-md transition-shadow duration-300">
                        <item.icon className="text-slate-500 text-lg" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">{item.label}</p>
                        <p className="text-lg font-semibold text-slate-800">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tour Details */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-inner border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                  <div className="bg-blue-500 p-2 rounded-lg mr-3">
                    <FiMapPin className="text-white text-lg" />
                  </div>
                  Tour Details
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 mr-4 group-hover:shadow-md transition-shadow duration-300">
                      <FiMapPin className="text-slate-500 text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Destinations</p>
                      <p className="text-lg font-semibold text-slate-800">
                        {tour.preferredDestinations.join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 mr-4 group-hover:shadow-md transition-shadow duration-300">
                      <FiCalendar className="text-slate-500 text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Travel Dates</p>
                      <p className="text-lg font-semibold text-slate-800">
                        {format(new Date(tour.startDate), 'MMM d, yyyy')} - {format(new Date(tour.endDate), 'MMM d, yyyy')}
                      </p>
                      <p className="text-sm text-slate-500 mt-1 bg-slate-200 px-3 py-1 rounded-full inline-block">
                        {Math.ceil((new Date(tour.endDate) - new Date(tour.startDate)) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 mr-4 group-hover:shadow-md transition-shadow duration-300">
                      <FiUsers className="text-slate-500 text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Group Size</p>
                      <p className="text-lg font-semibold text-slate-800">{tour.numberOfTravelers} travelers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial & Activities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Financial Details */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 shadow-inner border border-emerald-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                  <div className="bg-emerald-500 p-2 rounded-lg mr-3">
                    <FiDollarSign className="text-white text-lg" />
                  </div>
                  Financial Details
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-emerald-200 mr-4 group-hover:shadow-md transition-shadow duration-300">
                      <FiDollarSign className="text-emerald-600 text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Customer Budget</p>
                      <p className="text-2xl font-bold text-emerald-700">{formatPKR(tour.budget)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-emerald-200 mr-4 group-hover:shadow-md transition-shadow duration-300">
                      <FiHome className="text-emerald-600 text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Accommodation</p>
                      <p className="text-lg font-semibold text-slate-800">{tour.accommodationPreference}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-inner border border-purple-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                  <div className="bg-purple-500 p-2 rounded-lg mr-3">
                    <FiActivity className="text-white text-lg" />
                  </div>
                  Requested Activities
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-200 mr-4 group-hover:shadow-md transition-shadow duration-300">
                      <FiActivity className="text-purple-600 text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Activities</p>
                      <div className="flex flex-wrap gap-2">
                        {tour.activities && tour.activities.length > 0 ? 
                          tour.activities.map((activity, index) => (
                            <span key={index} className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                              {activity}
                            </span>
                          )) : 
                          <p className="text-slate-600 bg-slate-200 px-4 py-2 rounded-full">None specified</p>
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-purple-200 mr-4 group-hover:shadow-md transition-shadow duration-300">
                      <FiFileText className="text-purple-600 text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Special Requirements</p>
                      <p className="text-lg font-semibold text-slate-800">
                        {tour.specialRequirements || 'None specified'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Response Form */}
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl shadow-inner border border-indigo-200 p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                <div className="bg-indigo-500 p-2 rounded-lg mr-3">
                  <FiFileText className="text-white text-lg" />
                </div>
                Admin Response
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                    Update Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm font-medium"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="quotedPrice" className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                    Quoted Price (PKR)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-500 font-bold text-lg">₨</span>
                    </div>
                    <input
                      type="number"
                      name="quotedPrice"
                      id="quotedPrice"
                      value={formData.quotedPrice}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm font-medium"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
                
              <div className="mb-8">
                <label htmlFor="adminNotes" className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                  Admin Notes
                </label>
                <textarea
                  id="adminNotes"
                  name="adminNotes"
                  rows="6"
                  value={formData.adminNotes}
                  onChange={handleChange}
                  className="block w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm font-medium resize-none"
                  placeholder="Internal notes about this request..."
                ></textarea>
              </div>
                
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="group inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTourDetails;