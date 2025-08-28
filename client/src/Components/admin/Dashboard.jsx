// src/components/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminApi';
import { convertUSDToPKR, formatPKR } from '../../utils/currencyUtils';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { LineChart, Line as RechartsLine, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer } from 'recharts';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, 
  LineElement, BarElement, Title, Tooltip, Legend);

// Icons for stat cards
const icons = {
  users: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  bookings: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  pending: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  revenue: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  reviews: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  customTours: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  contacts: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
};

const StatCard = ({ title, value, icon, color, subtitle = null }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-gray-200">
    {/* Subtle gradient overlay */}
    <div className={`absolute inset-0 opacity-5 ${color.replace('bg-', 'bg-gradient-to-br from-')} to-transparent`}></div>
    
    <div className="relative flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d={icon}></path>
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 transition-colors duration-300">{value}</p>
            {subtitle && <p className="text-sm text-gray-600 font-medium">{subtitle}</p>}
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 opacity-20"></div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    bookingCount: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    revenue: 0,
    reviewCount: 0,
    averageRating: 0,
    customTourCount: 0,
    pendingCustomTours: 0,
    contactCount: 0,
    unreadContacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // State for storing actual data from API (kept for potential future use)
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentCustomTours, setRecentCustomTours] = useState([]);
  
  // New state for user growth data
  const [userGrowthData, setUserGrowthData] = useState([]);

  // Function to process user growth data
  const processUserGrowthData = (users) => {
    // Helper function to extract date from user object
    const getUserDate = (user) => {
      if (user.createdAt) return new Date(user.createdAt);
      if (user.createdate) return new Date(user.createdate);
      if (user.registrationDate) return new Date(user.registrationDate);
      if (user._id && typeof user._id === 'string' && user._id.length === 24) {
        try {
          const timestamp = parseInt(user._id.substring(0, 8), 16) * 1000;
          return new Date(timestamp);
        } catch (e) {
          return null;
        }
      }
      return null;
    };

    // Filter users with valid dates and sort by date
    const usersWithDates = users
      .map(user => ({
        ...user,
        joinDate: getUserDate(user)
      }))
      .filter(user => user.joinDate && !isNaN(user.joinDate.getTime()))
      .sort((a, b) => a.joinDate - b.joinDate);

    if (usersWithDates.length === 0) {
      // Generate sample data if no real data is available
      const sampleData = [];
      const now = new Date();
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        sampleData.push({
          month: monthName,
          users: Math.floor(Math.random() * 50) + 10,
          cumulative: Math.floor(Math.random() * 100) + 50
        });
      }
      return sampleData;
    }

    // Group users by month
    const monthlyData = {};
    usersWithDates.forEach(user => {
      const monthKey = user.joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0;
      }
      monthlyData[monthKey]++;
    });

    // Convert to array format for chart
    const chartData = [];
    let cumulativeUsers = 0;
    
    // Get last 12 months
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const monthlyCount = monthlyData[monthName] || 0;
      cumulativeUsers += monthlyCount;
      
      chartData.push({
        month: monthName,
        users: monthlyCount,
        cumulative: cumulativeUsers
      });
    }

    return chartData;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch main dashboard stats
        const dashboardData = await adminService.getDashboardStats();
        
        // Fetch review stats
        const reviewStats = await adminService.getReviewStats();
        
        // Fetch custom tour stats
        const customTourStats = await adminService.getCustomTourStats();
        
        // Fetch contact stats
        const contactStats = await adminService.getContactStats();
        
        // Fetch recent items (keeping for potential future use)
        const bookings = await adminService.getAllBookings();
        const reviews = await adminService.getAllReviews();
        const contacts = await adminService.getAllContacts();
        const customTours = await adminService.getAllCustomTours();
        
        // Fetch users for growth chart
        const users = await adminService.getAllUsers();
        
        // Sort by creation date (newest first)
        const sortByDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
        
        setRecentBookings(bookings.sort(sortByDate));
        setRecentReviews(reviews.sort(sortByDate));
        setRecentContacts(contacts.sort(sortByDate));
        setRecentCustomTours(customTours.sort(sortByDate));
        
        // Process user growth data
        const growthData = processUserGrowthData(users);
        setUserGrowthData(growthData);
        
        // Combine all data
        setStats({
          ...dashboardData,
          reviewCount: reviewStats.totalReviews || 0,
          averageRating: reviewStats.averageRating || 0,
          customTourCount: customTourStats.totalRequests || 0,
          pendingCustomTours: customTourStats.pendingRequests || 0,
          contactCount: contactStats.totalContacts || 0,
          unreadContacts: contactStats.unreadContacts || 0,
        });
                
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error('Dashboard data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    
    // Set refresh interval (every 5 minutes)
    const refreshInterval = setInterval(fetchAllData, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const prepareBookingsChartData = () => {
    return {
      labels: ['Confirmed', 'Pending', 'Cancelled'],
      datasets: [
        {
          data: [
            stats.confirmedBookings,
            stats.pendingBookings,
            stats.bookingCount - (stats.confirmedBookings + stats.pendingBookings)
          ],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(251, 191, 36, 1)',
            'rgba(239, 68, 68, 1)',
          ],
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    };
  };

  const prepareRatingChartData = () => {
    // Using real data if available
    if (recentReviews.length > 0) {
      const ratingCounts = [0, 0, 0, 0, 0]; // For 1 to 5 stars
      
      recentReviews.forEach(review => {
        const rating = Math.min(Math.max(Math.round(review.rating), 1), 5);
        ratingCounts[rating - 1]++;
      });
      
      return {
        labels: ['5★', '4★', '3★', '2★', '1★'],
        datasets: [
          {
            label: 'Number of Reviews',
            data: [
              ratingCounts[4], // 5 stars
              ratingCounts[3], // 4 stars
              ratingCounts[2], // 3 stars
              ratingCounts[1], // 2 stars
              ratingCounts[0], // 1 star
            ],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 0,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      };
    }
    
    // Fallback to simulated data
    return {
      labels: ['5★', '4★', '3★', '2★', '1★'],
      datasets: [
        {
          label: 'Number of Reviews',
          data: [
            Math.round(stats.reviewCount * 0.6),
            Math.round(stats.reviewCount * 0.25),
            Math.round(stats.reviewCount * 0.1),
            Math.round(stats.reviewCount * 0.03),
            Math.round(stats.reviewCount * 0.02),
          ],
          backgroundColor: 'rgba(99, 102, 241, 0.8)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 0,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <div className="text-center">
          <div className="relative">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <div className="absolute inset-0 inline-block h-16 w-16 animate-ping rounded-full border-4 border-solid border-indigo-300 opacity-20"></div>
          </div>
          <p className="mt-6 text-xl font-semibold text-gray-700">Loading dashboard data...</p>
          <p className="mt-2 text-sm text-gray-500">Please wait while we fetch the latest information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-gradient-to-br from-red-50 to-red-100 p-8 shadow-xl border border-red-200">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Something went wrong</h2>
          <p className="text-red-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 animate-fadeIn">
      {/* Header Section */}
      <div className="mb-12 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-lg text-gray-600">Welcome back! Here's what's happening with your travel platform.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="rounded-xl bg-white px-4 py-2 shadow-md border border-gray-200">
            <span className="text-sm font-medium text-gray-500">Last updated:</span>
            <span className="ml-2 text-sm font-semibold text-gray-700">{lastUpdated.toLocaleString()}</span>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>
      
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <StatCard
          title="Total Users"
          value={stats.userCount.toLocaleString()}
          icon={icons.users}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Bookings"
          value={stats.bookingCount.toLocaleString()}
          icon={icons.bookings}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          subtitle={`${stats.pendingBookings} pending`}
        />
        <StatCard
          title="Total Revenue"
          value={formatPKR(convertUSDToPKR(stats.revenue))}
          icon={icons.revenue}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="Reviews"
          value={stats.reviewCount.toLocaleString()}
          icon={icons.reviews}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
          subtitle={`Avg. ${stats.averageRating.toFixed(1)} out of 5`}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        <StatCard
          title="Custom Tour Requests"
          value={stats.customTourCount.toLocaleString()}
          icon={icons.customTours}
          color="bg-gradient-to-br from-indigo-500 to-indigo-600"
          subtitle={`${stats.pendingCustomTours} pending approval`}
        />
        <StatCard
          title="Contact Inquiries"
          value={stats.contactCount.toLocaleString()}
          icon={icons.contacts}
          color="bg-gradient-to-br from-rose-500 to-rose-600"
          subtitle={`${stats.unreadContacts} unread messages`}
        />
        <StatCard
          title="Pending Bookings"
          value={stats.pendingBookings.toLocaleString()}
          icon={icons.pending}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          subtitle="Awaiting confirmation"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-12">
        {/* Booking Status Chart */}
        <div className="rounded-2xl bg-white p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Booking Status</h3>
            <div className="rounded-full bg-gradient-to-r from-green-100 to-yellow-100 p-2">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="h-72">
            <Pie 
              data={prepareBookingsChartData()} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 20,
                      font: {
                        size: 14,
                        weight: 'bold'
                      },
                      usePointStyle: true,
                      pointStyle: 'circle'
                    }
                  },
                },
              }} 
            />
          </div>
        </div>

        {/* Reviews Distribution Chart */}
        <div className="rounded-2xl bg-white p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Review Ratings</h3>
            <div className="rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 p-2">
              <svg className="h-6 w-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <div className="h-72">
            <Bar 
              data={prepareRatingChartData()} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: `Average Rating: ${stats.averageRating.toFixed(1)}/5`,
                    font: {
                      size: 16,
                      weight: 'bold'
                    },
                    color: '#374151'
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      font: {
                        size: 14,
                        weight: 'bold'
                      }
                    }
                  },
                  y: {
                    grid: {
                      color: '#f3f4f6',
                    },
                    ticks: {
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* User Growth Chart - New Addition */}
      <div className="mb-12">
        <div className="rounded-2xl bg-white p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">User Growth Over Time</h3>
            <div className="rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 p-2">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <RechartsLegend />
                <RechartsLine 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  name="New Users"
                />
                <RechartsLine 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                  name="Total Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="rounded-lg bg-white p-6 shadow-lg mb-8">
        <h3 className="mb-6 text-lg font-medium text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <button onClick={() => window.location.href = '/admin/contacts'} className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            <span>Unread Messages</span>
            <span className="rounded-full bg-rose-500 px-2 py-1 text-xs font-semibold text-white">{stats.unreadContacts}</span>
          </button>
          <button onClick={() => window.location.href = '/admin/custom-tours'} className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            <span>Pending Custom Tours</span>
            <span className="rounded-full bg-indigo-500 px-2 py-1 text-xs font-semibold text-white">{stats.pendingCustomTours}</span>
          </button>
          <button onClick={() => window.location.href = '/admin/bookings'} className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            <span>Pending Bookings</span>
            <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-white">{stats.pendingBookings}</span>
          </button>
          <button onClick={() => window.location.href = '/admin/destinations'} className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            <span>Manage Destinations</span>
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard