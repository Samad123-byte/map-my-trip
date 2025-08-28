import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminApi';
import { 
  HandThumbUpIcon, 
  HandThumbDownIcon, 
  TrashIcon,
  ChartBarIcon,
  FunnelIcon,
  XMarkIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const ChatbotFeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    helpful: '',
    startDate: '',
    endDate: '',
    sortBy: 'createdAt',
    order: 'desc'
  });

  // Load feedback data
  const loadFeedback = async () => {
    setIsLoading(true);
    try {
      // Clean filters to ensure empty strings don't affect the API call
      const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {});

      const data = await adminService.getAllChatbotFeedback(cleanedFilters);
      setFeedback(data);
      
      // Also load stats
      const statsData = await adminService.getChatbotFeedbackStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading chatbot feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  // Apply filters
  const applyFilters = () => {
    loadFeedback();
    setShowFilters(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      helpful: '',
      startDate: '',
      endDate: '',
      sortBy: 'createdAt',
      order: 'desc'
    });
    // Use setTimeout to ensure state is updated before loading
    setTimeout(() => {
      loadFeedback();
    }, 100);
    setShowFilters(false);
  };

  // Delete feedback
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback? This action cannot be undone.')) {
      try {
        await adminService.deleteChatbotFeedback(id);
        setFeedback(feedback.filter(item => item._id !== id));
        // Reload stats after deletion
        const statsData = await adminService.getChatbotFeedbackStats();
        setStats(statsData);
      } catch (error) {
        console.error('Error deleting feedback:', error);
        alert('Failed to delete feedback. Please try again.');
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate satisfaction percentage
  const getSatisfactionPercentage = () => {
    if (!stats || stats.totalFeedback === 0) return 0;
    return Math.round((stats.helpfulCount / stats.totalFeedback) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Chatbot Feedback Management
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Monitor and analyze user feedback to improve chatbot performance
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 ${
                  showFilters 
                    ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <FunnelIcon className="h-4 w-4" />
                Filters
              </button>
              <button
                onClick={loadFeedback}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <ArrowPathIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Feedback */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Feedback</p>
                  <p className="text-3xl font-bold">{stats.totalFeedback}</p>
                </div>
                <div className="rounded-full bg-blue-400/20 p-3">
                  <ChatBubbleLeftRightIcon className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-blue-400/10"></div>
            </div>

            {/* Helpful Responses */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Helpful</p>
                  <p className="text-3xl font-bold">{stats.helpfulCount}</p>
                </div>
                <div className="rounded-full bg-green-400/20 p-3">
                  <HandThumbUpIcon className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-green-400/10"></div>
            </div>

            {/* Unhelpful Responses */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-red-600 p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Unhelpful</p>
                  <p className="text-3xl font-bold">{stats.unhelpfulCount}</p>
                </div>
                <div className="rounded-full bg-red-400/20 p-3">
                  <HandThumbDownIcon className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-red-400/10"></div>
            </div>

            {/* Satisfaction Rate */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Satisfaction</p>
                  <p className="text-3xl font-bold">{getSatisfactionPercentage()}%</p>
                </div>
                <div className="rounded-full bg-purple-400/20 p-3">
                  <ChartBarIcon className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-purple-400/10"></div>
            </div>
          </div>
        )}

        {/* Enhanced Chart */}
        {stats && stats.monthlyTrend && stats.monthlyTrend.length > 0 && (
          <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Monthly Satisfaction Trend
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track satisfaction rates over time
              </p>
            </div>
            <div className="p-6">
              <div className="h-64">
                <div className="flex h-full items-end justify-between gap-2">
                  {stats.monthlyTrend.map((month, index) => (
                    <div 
                      key={index} 
                      className="group relative flex h-full flex-col justify-end"
                      style={{ width: `${100 / stats.monthlyTrend.length}%` }}
                    >
                      <div className="flex h-full flex-col items-center justify-end">
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-indigo-400 transition-all duration-300 group-hover:from-indigo-600 group-hover:to-indigo-500"
                          style={{ height: `${Math.max(month.satisfaction, 5)}%`, minHeight: '8px' }}
                        ></div>
                      </div>
                      <div className="mt-3 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
                        {new Date(month.month).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden w-32 -translate-x-1/2 transform rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                        <div className="text-center">
                          <div className="font-medium">{new Date(month.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                          <div className="text-indigo-200">{month.satisfaction}% satisfaction</div>
                        </div>
                        <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Filters */}
        {showFilters && (
          <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Options</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Feedback Type
                  </label>
                  <select
                    value={filters.helpful}
                    onChange={(e) => setFilters({...filters, helpful: e.target.value})}
                    className="block w-full rounded-lg border-gray-300 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                  >
                    <option value="">All Feedback</option>
                    <option value="true">Helpful Only</option>
                    <option value="false">Unhelpful Only</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                      className="block w-full rounded-lg border-gray-300 pl-10 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    />
                    <CalendarDaysIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                      className="block w-full rounded-lg border-gray-300 pl-10 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    />
                    <CalendarDaysIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={resetFilters}
                  className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Reset Filters
                </button>
                <button
                  onClick={applyFilters}
                  className="rounded-lg border border-transparent bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Feedback List */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading feedback...</p>
            </div>
          </div>
        ) : feedback.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center shadow-lg dark:bg-gray-800">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 p-4 dark:bg-gray-700">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No feedback found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {Object.values(filters).some(v => v !== '' && v !== 'createdAt' && v !== 'desc') 
                ? 'Try adjusting your filters to see more results.' 
                : 'No feedback has been submitted yet.'}
            </p>
            {Object.values(filters).some(v => v !== '' && v !== 'createdAt' && v !== 'desc') && (
              <button
                onClick={resetFilters}
                className="mt-4 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <UserGroupIcon className="h-4 w-4" />
                        User
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Comments
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-4 w-4" />
                        Date
                      </div>
                    </th>
                    <th scope="col" className="relative px-6 py-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {feedback.map((item) => (
                    <tr key={item._id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {item.userId ? (
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-2.5">
                                <UserGroupIcon className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{item.userId.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{item.userId.email}</div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 p-2.5 dark:bg-gray-600">
                                <UserGroupIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                              </div>
                              <div className="text-gray-500 dark:text-gray-400">Anonymous User</div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          {item.comments ? (
                            <p className="text-sm text-gray-900 dark:text-white line-clamp-3">{item.comments}</p>
                          ) : (
                            <span className="text-sm italic text-gray-500 dark:text-gray-400">No comments provided</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.helpful ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-800/20 dark:text-green-400">
                            <HandThumbUpIcon className="h-3.5 w-3.5" />
                            Helpful
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-800/20 dark:text-red-400">
                            <HandThumbDownIcon className="h-3.5 w-3.5" />
                            Unhelpful
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="relative whitespace-nowrap px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="inline-flex items-center justify-center rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                          title="Delete feedback"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotFeedbackManagement;