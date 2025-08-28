// src/components/admin/ReviewDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminApi';

const ReviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moderationNote, setModerationNote] = useState('');
  
  useEffect(() => {
    fetchReviewDetails();
  }, [id]);
  
  const fetchReviewDetails = async () => {
    try {
      setLoading(true);
      const data = await adminService.getReviewById(id);
      setReview(data);
      setModerationNote(data.moderationNote || '');
      setError(null);
    } catch (err) {
      setError('Failed to load review details. Please try again.');
      console.error('Review details error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = async (newStatus) => {
    try {
      await adminService.updateReviewStatus(id, newStatus, moderationNote);
      setReview({ ...review, status: newStatus, moderationNote });
      alert('Review status updated successfully');
    } catch (err) {
      console.error('Error updating review status:', err);
      alert('Error updating review status. Please try again.');
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      try {
        await adminService.deleteReview(id);
        alert('Review deleted successfully');
        navigate('/admin/reviews');
      } catch (err) {
        console.error('Error deleting review:', err);
        alert('Error deleting review. Please try again.');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <div className="text-xl font-semibold text-slate-700">Loading review details...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-100 rounded-full p-2">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Error</h2>
          </div>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={fetchReviewDetails}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!review) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-yellow-100 rounded-full p-2">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Review Not Found</h2>
          </div>
          <p className="text-slate-600 mb-6">The review you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => navigate('/admin/reviews')}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Back to Reviews
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Review Details</h1>
            <p className="text-slate-600 mt-1">Manage and moderate user reviews</p>
          </div>
          <button
            onClick={() => navigate('/admin/reviews')}
            className="flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-5 rounded-xl shadow-sm border border-slate-200 transition-all duration-200 hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Back to Reviews</span>
          </button>
        </div>
        
        <div className="space-y-8">
          {/* Review Information Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">{review.title}</h2>
                  <p className="text-blue-100">Review submitted by {review.user.name}</p>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <span className="text-2xl font-bold text-white mr-1">{review.rating}</span>
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Destination</dt>
                  <dd className="text-lg font-semibold text-slate-900">{review.destination.name}</dd>
                </div>
                
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">User</dt>
                  <dd className="text-lg font-semibold text-slate-900">{review.user.name}</dd>
                  <dd className="text-sm text-slate-600">{review.user.email}</dd>
                </div>
                
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Date Visited</dt>
                  <dd className="text-lg font-semibold text-slate-900">{new Date(review.dateVisited).toLocaleDateString()}</dd>
                </div>
                
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Date Submitted</dt>
                  <dd className="text-lg font-semibold text-slate-900">{new Date(review.createdAt).toLocaleDateString()}</dd>
                </div>
              </div>
              
              <div className="space-y-1 mb-6">
                <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Review Comment</dt>
                <dd className="text-slate-700 bg-slate-50 rounded-xl p-4 leading-relaxed">{review.comment}</dd>
              </div>
              
              {review.photos && review.photos.length > 0 && (
                <div className="space-y-3 mb-6">
                  <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Photos</dt>
                  <dd className="flex flex-wrap gap-4">
                    {review.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="h-24 w-24 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-200">
                          <img 
                            src={photo.url} 
                            alt={`Review photo ${index + 1}`} 
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      </div>
                    ))}
                  </dd>
                </div>
              )}
              
              <div className="space-y-1">
                <dt className="text-sm font-medium text-slate-500 uppercase tracking-wide">Current Status</dt>
                <dd>
                  <span 
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      review.status === 'published' ? 'bg-green-100 text-green-800 ring-1 ring-green-600/20' :
                      review.status === 'pending' ? 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-600/20' :
                      'bg-red-100 text-red-800 ring-1 ring-red-600/20'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      review.status === 'published' ? 'bg-green-500' :
                      review.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </dd>
              </div>
            </div>
          </div>
          
          {/* Moderation Controls Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-6">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Moderation Controls</h3>
                  <p className="text-slate-300">Manage review status and add internal notes</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="moderationNote" className="block text-sm font-medium text-slate-700 mb-2">
                  Internal Moderation Note
                </label>
                <textarea
                  id="moderationNote"
                  name="moderationNote"
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  placeholder="Add internal note about why this review was approved or rejected..."
                  value={moderationNote}
                  onChange={(e) => setModerationNote(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleStatusChange('published')}
                    disabled={review.status === 'published'}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      review.status === 'published'
                        ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                        : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Publish Review</span>
                  </button>
                  
                  <button
                    onClick={() => handleStatusChange('pending')}
                    disabled={review.status === 'pending'}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      review.status === 'pending'
                        ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                        : 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Mark as Pending</span>
                  </button>
                  
                  <button
                    onClick={() => handleStatusChange('rejected')}
                    disabled={review.status === 'rejected'}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      review.status === 'rejected'
                        ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                        : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>Reject Review</span>
                  </button>
                </div>
                
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-xl border border-red-200 transition-all duration-200 hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  <span>Delete Review</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;