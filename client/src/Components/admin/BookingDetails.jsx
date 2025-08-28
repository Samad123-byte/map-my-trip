// src/components/admin/BookingDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminApi';
import { convertUSDToPKR, formatPKR } from '../../utils/currencyUtils';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        // Use the getBookingById method if available, otherwise filter from all bookings
        let foundBooking;
        try {
          foundBooking = await adminService.getBookingById(id);
        } catch (err) {
          // Fallback to filtering from all bookings
          const allBookings = await adminService.getAllBookings();
          foundBooking = allBookings.find(b => b._id === id);
        }
        
        if (!foundBooking) {
          throw new Error('Booking not found');
        }
        
        setBooking(foundBooking);
        setError(null);
      } catch (err) {
        setError('Failed to load booking details. Please try again.');
        console.error('Error fetching booking details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookingDetails();
    }
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      await adminService.updateBookingStatus(booking._id, newStatus);
      
      // Update local state
      setBooking(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error('Error updating booking status:', err);
      setError('Failed to update booking status. Please try again.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-amber-100 text-amber-800 border border-amber-200',
      confirmed: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      cancelled: 'bg-rose-100 text-rose-800 border border-rose-200',
      completed: 'bg-sky-100 text-sky-800 border border-sky-200',
    };
    
    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
        <span className={`mr-1.5 h-2 w-2 rounded-full ${status === 'pending' ? 'bg-amber-500' : 
                                                        status === 'confirmed' ? 'bg-emerald-500' : 
                                                        status === 'cancelled' ? 'bg-rose-500' : 
                                                        status === 'completed' ? 'bg-sky-500' : 'bg-gray-500'}`}></span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex items-center space-x-3">
          <svg className="h-8 w-8 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="text-xl font-medium text-gray-700">Loading booking details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-8 text-red-800 shadow-md">
        <div className="flex items-center">
          <svg className="mr-3 h-6 w-6 text-red-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-lg font-semibold">Error</h2>
        </div>
        <p className="mt-2 text-sm">{error}</p>
        <div className="mt-4 flex space-x-3">
          <button
            onClick={() => navigate('/admin/bookings')}
            className="rounded-md bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back to Bookings
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-red-100 px-4 py-2 font-medium text-red-800 transition hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="rounded-xl bg-amber-50 p-8 text-amber-800 shadow-md">
        <div className="flex items-center">
          <svg className="mr-3 h-6 w-6 text-amber-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-lg font-semibold">Booking Not Found</h2>
        </div>
        <p className="mt-2 text-sm">The booking you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/admin/bookings')}
          className="mt-4 rounded-md bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-col justify-between rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 shadow-md sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-white">Booking Details</h2>
        <button
          onClick={() => navigate('/admin/bookings')}
          className="mt-4 inline-flex items-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:mt-0"
        >
          <svg className="mr-2 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Bookings
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">
          <div className="flex flex-col justify-between sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center">
                <h3 className="text-xl font-semibold text-gray-900">Booking #{booking._id}</h3>
                <div className="ml-4">{getStatusBadge(booking.status)}</div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                <span className="inline-flex items-center">
                  <svg className="mr-1.5 h-4 w-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Created on {new Date(booking.createdAt).toLocaleDateString()} at {new Date(booking.createdAt).toLocaleTimeString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Customer Information - Updated to match backend schema */}
            <div className="space-y-1.5">
              <h4 className="flex items-center text-sm font-medium text-gray-500">
                <svg className="mr-1.5 h-4 w-4 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer Information
              </h4>
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-800">
                    {booking.userId?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{booking.userId?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-500">{booking.userId?.email || 'N/A'}</p>
                  </div>
                </div>
                
                {/* Booking Details Contact Info */}
                {booking.bookingDetails?.firstName && booking.bookingDetails?.lastName && (
                  <div className="mb-3 rounded-md bg-blue-50 p-3">
                    <p className="text-sm font-medium text-blue-900">
                      Contact: {booking.bookingDetails.firstName} {booking.bookingDetails.lastName}
                    </p>
                    {booking.bookingDetails.email && (
                      <p className="text-sm text-blue-700">{booking.bookingDetails.email}</p>
                    )}
                  </div>
                )}
                
                {booking.bookingDetails?.phone && (
                  <div className="flex items-center rounded-md bg-gray-50 p-3">
                    <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm text-gray-700">{booking.bookingDetails.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Information - Updated field mappings */}
            <div className="space-y-1.5">
              <h4 className="flex items-center text-sm font-medium text-gray-500">
                <svg className="mr-1.5 h-4 w-4 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Booking Information
              </h4>
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center border-b border-gray-100 pb-2">
                    <svg className="mr-3 h-5 w-5 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Destination</p>
                      <p className="font-medium text-gray-900">{booking.destination?.name || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-100 pb-2">
                    <svg className="mr-3 h-5 w-5 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Travel Date</p>
                      <p className="font-medium text-gray-900">{new Date(booking.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {booking.bookingDetails?.duration && (
                    <div className="flex items-center border-b border-gray-100 pb-2">
                      <svg className="mr-3 h-5 w-5 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Duration</p>
                        <p className="font-medium text-gray-900">{booking.bookingDetails.duration}</p>
                      </div>
                    </div>
                  )}
                  
                  {booking.bookingDetails?.travelers && (
                    <div className="flex items-center border-b border-gray-100 pb-2">
                      <svg className="mr-3 h-5 w-5 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Travelers</p>
                        <p className="font-medium text-gray-900">{booking.bookingDetails.travelers} {booking.bookingDetails.travelers === 1 ? 'person' : 'people'}</p>
                      </div>
                    </div>
                  )}
                  
                  {booking.bookingDetails?.accommodation && (
                    <div className="flex items-center border-b border-gray-100 pb-2">
                      <svg className="mr-3 h-5 w-5 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Accommodation</p>
                        <p className="font-medium text-gray-900">{booking.bookingDetails.accommodation}</p>
                      </div>
                    </div>
                  )}
                  
                  {booking.price && (
                    <div className="flex items-center border-b border-gray-100 pb-2">
                      <svg className="mr-3 h-5 w-5 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Total Amount</p>
                        <p className="font-medium text-gray-900">
                          {booking.currency === 'PKR' ? 
                            formatPKR(booking.price) : 
                            `${booking.currency} ${booking.price}`
                          }
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {booking.transactionId && (
                    <div className="flex items-center">
                      <svg className="mr-3 h-5 w-5 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Transaction ID</p>
                        <p className="font-medium text-gray-900">{booking.transactionId}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {booking.bookingDetails?.specialRequests && (
            <div className="mt-6">
              <h4 className="mb-2 flex items-center text-sm font-medium text-gray-500">
                <svg className="mr-1.5 h-4 w-4 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Special Requests
              </h4>
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm italic text-gray-700">{booking.bookingDetails.specialRequests}</p>
              </div>
            </div>
          )}

          {/* Booking Management */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h4 className="mb-4 flex items-center text-sm font-medium text-gray-500">
              <svg className="mr-1.5 h-4 w-4 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Booking Management
            </h4>
            
            <div className="flex flex-wrap gap-3">
              {booking.status === 'pending' && (
                <button
                  onClick={() => handleUpdateStatus('confirmed')}
                  disabled={updatingStatus}
                  className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updatingStatus ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Confirming...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      Confirm Booking
                    </>
                  )}
                </button>
              )}
              
              {(booking.status === 'pending' || booking.status === 'confirmed') && (
                <button
                  onClick={() => handleUpdateStatus('cancelled')}
                  disabled={updatingStatus}
                  className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updatingStatus ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel Booking
                    </>
                  )}
                </button>
              )}
              
              {booking.status === 'confirmed' && (
                <button
                  onClick={() => handleUpdateStatus('completed')}
                  disabled={updatingStatus}
                  className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updatingStatus ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Completing...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mark as Completed
                    </>
                  )}
                </button>
              )}
            </div>
            
            {error && (
              <div className="mt-4 flex items-center rounded-lg bg-red-50 p-4 text-sm text-red-800">
                <svg className="mr-2 h-5 w-5 flex-shrink-0 text-red-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;