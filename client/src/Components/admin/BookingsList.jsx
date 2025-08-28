import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminApi';
import { useTranslation } from "react-i18next";
import { formatPKR } from '../../utils/currencyUtils';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    if (typeof contentObj === 'object' && contentObj !== null) {
      const currentLang = 'en'; // Default to English, ideally get this from i18n context
      return contentObj[currentLang] || contentObj.en || fallback;
    }
    
    return contentObj;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await adminService.getAllBookings();
        setBookings(data);
        setError(null);
      } catch (err) {
        setError('Failed to load bookings. Please try again.');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const destinationName = getTranslatedContent(booking.destination?.name, '');
    
    // Access user data from userId (populated from the API)
    const userName = booking.userId?.name || '';
    const userEmail = booking.userId?.email || '';
    // Also check booking details for customer info
    const customerFirstName = booking.bookingDetails?.firstName || '';
    const customerLastName = booking.bookingDetails?.lastName || '';
    const customerEmail = booking.bookingDetails?.email || '';

    const matchesSearch = 
      destinationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking._id?.includes(searchTerm) ||
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId);
      await adminService.updateBookingStatus(bookingId, newStatus);
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking._id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      
      // Close modal if open
      if (selectedBooking && selectedBooking._id === bookingId) {
        setSelectedBooking(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Failed to update booking status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-amber-100 text-amber-800 border border-amber-300',
      confirmed: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
      cancelled: 'bg-rose-100 text-rose-800 border border-rose-300',
      completed: 'bg-indigo-100 text-indigo-800 border border-indigo-300',
    };
    
    return (
      <span className={`inline-flex items-center justify-center rounded-full px-3 py-0.5 text-xs font-medium ${statusStyles[status] || 'bg-slate-100 text-slate-800 border border-slate-300'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <div className="mt-4 text-lg font-semibold text-slate-700">Loading bookings...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800 shadow-sm">
        <div className="flex items-center">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="ml-3 text-lg font-semibold">Error Loading Bookings</h2>
        </div>
        <p className="mt-2 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 inline-flex items-center rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <div className="mb-8 flex flex-col justify-between rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Bookings Management</h2>
          <p className="mt-1 text-blue-100">Manage and monitor all tour bookings</p>
        </div>
        <div className="mt-4 flex flex-col space-y-3 md:mt-0 md:flex-row md:space-x-3 md:space-y-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full rounded-lg border border-blue-400 bg-white bg-opacity-90 px-4 py-2 pr-10 text-slate-800 placeholder-slate-500 focus:border-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-white sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-slate-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-blue-400 bg-white bg-opacity-90 px-4 py-2 text-slate-800 focus:border-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-white"
          >
            <option value="all" className="bg-white text-slate-800">All Statuses</option>
            <option value="pending" className="bg-white text-slate-800">Pending</option>
            <option value="confirmed" className="bg-white text-slate-800">Confirmed</option>
            <option value="cancelled" className="bg-white text-slate-800">Cancelled</option>
            <option value="completed" className="bg-white text-slate-800">Completed</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Booking ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Destination
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-mono text-sm font-medium text-slate-700">
                        #{booking._id.slice(-6)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-slate-800">{getTranslatedContent(booking.destination?.name, 'N/A')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-800">
                        {/* Show user name if available, otherwise show booking details name */}
                        {booking.userId?.name || 
                         `${booking.bookingDetails?.firstName || ''} ${booking.bookingDetails?.lastName || ''}`.trim() || 
                         'N/A'}
                      </div>
                      <div className="text-sm text-slate-500">
                        {booking.userId?.email || booking.bookingDetails?.email || 'N/A'}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-slate-600">
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-slate-800">
                        {booking.price ? formatPKR(booking.price) : 'N/A'}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedBooking({
                            ...booking,
                            user: booking.userId 
                          })}
                          className="flex items-center rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                        >
                          <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                            disabled={updatingId === booking._id}
                            className="flex items-center rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            {updatingId === booking._id ? 'Updating...' : 'Confirm'}
                          </button>
                        )}
                        
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                          <button
                            onClick={() => handleUpdateStatus(booking._id, 'cancelled')}
                            disabled={updatingId === booking._id}
                            className="flex items-center rounded-md bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition-colors hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            {updatingId === booking._id ? 'Updating...' : 'Cancel'}
                          </button>
                        )}
                        
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(booking._id, 'completed')}
                            disabled={updatingId === booking._id}
                            className="flex items-center rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {updatingId === booking._id ? 'Updating...' : 'Complete'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center rounded-lg bg-slate-50 p-6">
                      <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-4 text-center text-sm font-medium text-slate-700">
                        {searchTerm || statusFilter !== 'all' 
                          ? 'No bookings match your search criteria.' 
                          : 'No bookings found.'}
                      </p>
                      {(searchTerm || statusFilter !== 'all') && (
                        <button 
                          onClick={() => {setSearchTerm(''); setStatusFilter('all');}}
                          className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-800"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {bookings.length > 0 && filteredBookings.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-slate-50 px-6 py-3">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-700">{filteredBookings.length}</span> of <span className="font-medium text-slate-700">{bookings.length}</span> bookings
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl bg-white shadow-2xl">
            <div className="relative border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">
                  Booking Details
                </h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-500"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="absolute -bottom-px left-0 h-1 w-full overflow-hidden">
                <div className={`h-full ${
                  selectedBooking.status === 'pending' ? 'bg-amber-500' :
                  selectedBooking.status === 'confirmed' ? 'bg-emerald-500' :
                  selectedBooking.status === 'cancelled' ? 'bg-rose-500' :
                  'bg-indigo-500'
                }`}></div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4 shadow-sm">
                  <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500">Booking Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-slate-500">Booking ID</span>
                      <p className="font-mono text-sm font-medium text-slate-800">#{selectedBooking._id}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Destination</span>
                      <p className="text-sm font-medium text-slate-800">{getTranslatedContent(selectedBooking.destination?.name, 'N/A')}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Date</span>
                      <p className="text-sm text-slate-800">{new Date(selectedBooking.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Amount</span>
                      <p className="text-sm font-medium text-slate-800">
                        {selectedBooking.price ? formatPKR(selectedBooking.price) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Status</span>
                      <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                    </div>
                    {selectedBooking.transactionId && (
                      <div>
                        <span className="text-xs text-slate-500">Transaction ID</span>
                        <p className="text-sm font-mono text-slate-800">{selectedBooking.transactionId}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="rounded-lg bg-slate-50 p-4 shadow-sm">
                  <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500">Customer Information</h4>
                  <div className="mb-4 flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      {(selectedBooking.user?.name?.charAt(0) || 
                        selectedBooking.bookingDetails?.firstName?.charAt(0) || 
                        'U').toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-800">
                        {selectedBooking.user?.name || 
                         `${selectedBooking.bookingDetails?.firstName || ''} ${selectedBooking.bookingDetails?.lastName || ''}`.trim() || 
                         'N/A'}
                      </p>
                      <p className="text-sm text-slate-500">
                        {selectedBooking.user?.email || selectedBooking.bookingDetails?.email || 'N/A'}
                      </p>
                    </div>
                  </div>
                  {(selectedBooking.user?.phone || selectedBooking.bookingDetails?.phone) && (
                    <div className="flex items-center text-sm text-slate-800">
                      <svg className="mr-2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {selectedBooking.user?.phone || selectedBooking.bookingDetails?.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Details Section */}
              {selectedBooking.bookingDetails && (
                <div className="mb-6 rounded-lg bg-slate-50 p-4 shadow-sm">
                  <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500">Trip Details</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {selectedBooking.bookingDetails.duration && (
                      <div>
                        <span className="text-xs text-slate-500">Duration</span>
                        <p className="text-sm text-slate-800">{selectedBooking.bookingDetails.duration}</p>
                      </div>
                    )}
                    {selectedBooking.bookingDetails.travelers && (
                      <div>
                        <span className="text-xs text-slate-500">Travelers</span>
                        <p className="text-sm text-slate-800">{selectedBooking.bookingDetails.travelers} person(s)</p>
                      </div>
                    )}
                    {selectedBooking.bookingDetails.accommodation && (
                      <div>
                        <span className="text-xs text-slate-500">Accommodation</span>
                        <p className="text-sm text-slate-800">{selectedBooking.bookingDetails.accommodation}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {selectedBooking.bookingDetails?.specialRequests && (
                <div className="mb-6 rounded-lg bg-slate-50 p-4 shadow-sm">
                  <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500">Special Requests</h4>
                  <p className="text-sm text-slate-700">{selectedBooking.bookingDetails.specialRequests}</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Close
                </button>
                
                {selectedBooking.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedBooking._id, 'confirmed')}
                    disabled={updatingId === selectedBooking._id}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {updatingId === selectedBooking._id ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                )}
                
                {(selectedBooking.status === 'pending' || selectedBooking.status === 'confirmed') && (
                  <button
                    onClick={() => handleUpdateStatus(selectedBooking._id, 'cancelled')}
                    disabled={updatingId === selectedBooking._id}
                    className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {updatingId === selectedBooking._id ? 'Cancelling...' : 'Cancel Booking'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsList;