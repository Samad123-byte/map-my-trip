// src/components/admin/ReviewsList.jsx
import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminApi';
import { useTranslation } from 'react-i18next';

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [filter, setFilter] = useState('all'); // all, published, pending, rejected
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, highest, lowest
  const [expandedReviews, setExpandedReviews] = useState(new Set());

  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    // If it's a string that looks like JSON, try to parse it
    if (typeof contentObj === 'string' && (contentObj.startsWith('{') || contentObj.startsWith('['))) {
      try {
        const parsed = JSON.parse(contentObj);
        if (typeof parsed === 'object' && parsed !== null) {
          return parsed[currentLang] || parsed.en || Object.values(parsed)[0] || fallback;
        }
        return parsed.toString();
      } catch (e) {
        // If parsing fails, return the original string
        return contentObj;
      }
    }
    
    // Handle already parsed objects
    if (typeof contentObj === 'object' && contentObj !== null) {
      return contentObj[currentLang] || contentObj.en || Object.values(contentObj)[0] || fallback;
    }
    
    // Return the content as is if it's a simple string
    return contentObj;
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const toggleExpandReview = (reviewId) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage, filter, sortBy]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build filter parameters properly
      const filters = {
        page: currentPage,
        limit: 10, // Add a reasonable limit
        sortBy: sortBy
      };
      
      // Add status filter if it's not 'all'
      if (filter && filter !== 'all') {
        filters.status = filter;
      }
      
      console.log('Fetching reviews with filters:', filters);
      
      const response = await adminService.getAllReviews(filters);
      
      console.log('Reviews API response:', response);
      
      // Handle different possible response structures
      let reviewsData = [];
      let paginationInfo = {};
      
      if (response) {
        // Case 1: Direct array response
        if (Array.isArray(response)) {
          reviewsData = response;
          paginationInfo = { totalPages: 1, totalReviews: response.length };
        }
        // Case 2: Object with reviews array
        else if (response.reviews && Array.isArray(response.reviews)) {
          reviewsData = response.reviews;
          paginationInfo = {
            totalPages: response.totalPages || response.pagination?.totalPages || 1,
            totalReviews: response.totalReviews || response.total || response.reviews.length
          };
        }
        // Case 3: Object with data array
        else if (response.data && Array.isArray(response.data)) {
          reviewsData = response.data;
          paginationInfo = {
            totalPages: response.pagination?.totalPages || response.totalPages || 1,
            totalReviews: response.pagination?.total || response.total || response.data.length
          };
        }
        // Case 4: Object with success flag
        else if (response.success && response.data) {
          if (Array.isArray(response.data)) {
            reviewsData = response.data;
          } else if (response.data.reviews) {
            reviewsData = response.data.reviews;
            paginationInfo = {
              totalPages: response.data.totalPages || 1,
              totalReviews: response.data.totalReviews || response.data.reviews.length
            };
          }
        }
        // Case 5: Direct object properties
        else if (response.totalPages || response.total) {
          reviewsData = [];
          paginationInfo = {
            totalPages: response.totalPages || 1,
            totalReviews: response.total || 0
          };
        }
      }
      
      // Ensure we have valid arrays and numbers
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      setTotalPages(Math.max(1, parseInt(paginationInfo.totalPages) || 1));
      setTotalReviews(parseInt(paginationInfo.totalReviews) || reviewsData.length || 0);
      
      console.log('Processed reviews data:', {
        reviewsCount: reviewsData.length,
        totalPages: paginationInfo.totalPages,
        totalReviews: paginationInfo.totalReviews
      });
      
    } catch (err) {
      console.error('Reviews loading error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load reviews. Please try again.');
      setReviews([]);
      setTotalPages(1);
      setTotalReviews(0);
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = async (reviewId, newStatus) => {
    try {
      const result = await adminService.updateReviewStatus(reviewId, newStatus);
      
      // Update the review in the current list
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review._id === reviewId ? { ...review, status: newStatus } : review
        )
      );
      
      // Show success message
      console.log('Review status updated successfully');
    } catch (err) {
      console.error('Error updating review status:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Error updating review status. Please try again.';
      alert(errorMessage);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      try {
        await adminService.deleteReview(reviewId);
        
        // Remove the review from the current list
        setReviews(prevReviews => prevReviews.filter(review => review._id !== reviewId));
        setTotalReviews(prev => Math.max(0, prev - 1));
        
        // If we're on a page that becomes empty, go to previous page
        if (reviews.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
        
        console.log('Review deleted successfully');
      } catch (err) {
        console.error('Error deleting review:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Error deleting review. Please try again.';
        alert(errorMessage);
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm';
      case 'rejected':
        return 'bg-red-50 text-red-700 border border-red-200 shadow-sm';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-200 shadow-sm';
    }
  };

  const handleFilterChange = (newFilter) => {
    if (newFilter !== filter) {
      setFilter(newFilter);
      setCurrentPage(1); // Reset to first page when filter changes
    }
  };

  const handleSortChange = (newSort) => {
    if (newSort !== sortBy) {
      setSortBy(newSort);
      setCurrentPage(1); // Reset to first page when sort changes
    }
  };

  const handleRefresh = () => {
    setError(null);
    setExpandedReviews(new Set());
    fetchReviews();
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="text-center">
          <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <div className="text-xl font-semibold text-slate-700">Loading reviews...</div>
          <div className="text-sm text-slate-500 mt-2">Please wait while we fetch the data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Reviews Management
              </h1>
              <p className="text-slate-600 mt-1">Manage and moderate customer reviews</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{totalReviews}</div>
              <div className="text-sm text-slate-500">Total Reviews</div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="mb-6 bg-white rounded-xl shadow-md border border-slate-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-3">
                <label htmlFor="filter-select" className="text-sm font-semibold text-slate-700">
                  Filter Status:
                </label>
                <select
                  id="filter-select"
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-slate-300"
                >
                  <option value="all">All Reviews</option>
                  <option value="published">✅ Published</option>
                  <option value="pending">⏳ Pending</option>
                  <option value="rejected">❌ Rejected</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <label htmlFor="sort-select" className="text-sm font-semibold text-slate-700">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-slate-300"
                >
                  <option value="newest">🕒 Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                  <option value="highest">⭐ Highest Rated</option>
                  <option value="lowest">📉 Lowest Rated</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={`inline-flex items-center space-x-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                loading 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-200' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              <span>{loading ? 'Loading...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 p-6 shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-semibold text-red-800">Error Loading Reviews</h3>
                <p className="mt-1 text-red-700">{error}</p>
                <div className="mt-4">
                  <button
                    onClick={handleRefresh}
                    className="inline-flex items-center rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Cards */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => {
              const reviewTitle = getTranslatedContent(review.title, '');
              const reviewComment = getTranslatedContent(review.comment, '');
              const fullReviewText = reviewTitle && reviewComment 
                ? `${reviewTitle} - ${reviewComment}` 
                : reviewTitle || reviewComment || 'No content';
              const isExpanded = expandedReviews.has(review._id);
              
              return (
                <div key={review._id} className="bg-white rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Main Content */}
                      <div className="flex-1 space-y-4">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {review.user?.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">
                                {review.destination ? getTranslatedContent(review.destination.name, 'Unknown Destination') : 'Unknown Destination'}
                              </h3>
                              <p className="text-sm text-slate-600">
                                by {review.user?.name || 'Unknown User'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < (review.rating || 0) ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-2 text-sm font-medium text-slate-700">{review.rating || 0}/5</span>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(review.status)}`}>
                              {review.status ? `${review.status.charAt(0).toUpperCase()}${review.status.slice(1)}` : 'Unknown'}
                            </span>
                          </div>
                        </div>

                        {/* Review Content */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                          {isExpanded ? (
                            <div className="space-y-2">
                              {reviewTitle && (
                                <h4 className="font-semibold text-slate-800">{reviewTitle}</h4>
                              )}
                              {reviewComment && (
                                <p className="text-slate-700 leading-relaxed">{reviewComment}</p>
                              )}
                            </div>
                          ) : (
                            <p className="text-slate-700 leading-relaxed">{truncateText(fullReviewText, 120)}</p>
                          )}
                          {fullReviewText.length > 120 && (
                            <button
                              onClick={() => toggleExpandReview(review._id)}
                              className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium inline-flex items-center transition-colors duration-200"
                            >
                              {isExpanded ? (
                                <>
                                  <span>Show Less</span>
                                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  <span>Show More</span>
                                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {/* Footer Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-slate-500">
                          <span>Submitted on {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          }) : 'Unknown Date'}</span>
                          {review.user?.email && (
                            <span className="text-slate-400">Contact: {review.user.email}</span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-2 min-w-[140px]">
                        <button
                          onClick={() => handleStatusChange(review._id, 'published')}
                          disabled={review.status === 'published'}
                          className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            review.status === 'published'
                              ? 'cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200'
                              : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                          }`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Publish
                        </button>
                        
                        <button
                          onClick={() => handleStatusChange(review._id, 'rejected')}
                          disabled={review.status === 'rejected'}
                          className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            review.status === 'rejected'
                              ? 'cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200'
                              : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                          }`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                        
                        <button
                          onClick={() => window.open(`/destinations/${review.destination?._id}#review-${review._id}`, '_blank')}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h6a2 2 0 002-2V8" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {loading ? 'Loading reviews...' : 'No reviews found'}
                </h3>
                {!loading && (
                  <p className="text-slate-600">
                    {filter !== 'all' 
                      ? `No reviews found matching the current filters. Try adjusting your search criteria.`
                      : 'No reviews have been submitted yet. Check back later for new submissions.'
                    }
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-slate-600">
                <span className="font-medium">
                  Showing page {currentPage} of {totalPages}
                </span>
                {totalReviews > 0 && (
                  <span className="text-slate-500 ml-2">
                    ({totalReviews} total reviews)
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === 1
                      ? 'cursor-not-allowed bg-slate-100 text-slate-400 border-2 border-slate-200'
                      : 'bg-white text-slate-700 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg">
                    {currentPage}
                  </span>
                  <span className="text-slate-400">of</span>
                  <span className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg">
                    {totalPages}
                  </span>
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'cursor-not-allowed bg-slate-100 text-slate-400 border-2 border-slate-200'
                      : 'bg-white text-slate-700 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md'
                  }`}
                >
                  Next
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;