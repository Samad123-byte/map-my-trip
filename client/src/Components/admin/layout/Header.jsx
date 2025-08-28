import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Show logout animation for 2 seconds
    setTimeout(() => {
      // Clear ALL authentication data - this is the key fix
      localStorage.removeItem('token');        // Remove regular token
      localStorage.removeItem('adminToken');   // Remove admin token
      localStorage.removeItem('user');         // Remove user data
      localStorage.removeItem('userId');       // Remove user ID
      
      // Optional: Clear any other user-specific data
      localStorage.removeItem('wishlist');
      localStorage.removeItem('recentSearches');
      
      console.log('Admin logout: All authentication data cleared');
      
      navigate('/login');
      setIsLoggingOut(false);
    }, 2000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Logout Animation Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-lg">
          <div className="text-center">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">Signing Out...</h3>
            <p className="text-white/80">Thank you for managing Map My Travel</p>
          </div>
        </div>
      )}

      <header className="relative z-10 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-xl">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/8 via-purple-600/6 to-teal-600/8 animate-gradient-x"></div>
        
        <div className="relative flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="group p-2.5 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 focus:outline-none md:hidden transform hover:scale-110 hover:rotate-180"
            >
              <svg
                className="h-6 w-6 transition-transform duration-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            {/* Logo and title with enhanced animations */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 rounded-2xl opacity-60 group-hover:opacity-100 transition duration-500 blur-lg group-hover:blur-xl"></div>
                <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 rounded-2xl text-white shadow-2xl transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-12">
                  <svg 
                    className="h-7 w-7 group-hover:animate-bounce" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                </div>
              </div>
              <div className="group">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-800 via-purple-700 to-teal-700 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-teal-600 transition-all duration-500">
                  Map My Travel
                </h1>
                <p className="text-sm text-gray-600 -mt-1 font-medium group-hover:text-indigo-600 transition-colors duration-300">
                  🏔️ Travel Admin Control Center
                </p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            {/* Enhanced Clock section */}
            <div className="hidden md:flex items-center space-x-4 px-5 py-3 bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg 
                      className="h-5 w-5 text-white animate-pulse" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-800 text-lg tracking-wider">{formatTime(currentTime)}</div>
                  <div className="text-xs text-gray-500 font-medium">{formatDate(currentTime)}</div>
                </div>
              </div>
            </div>

            {/* Admin profile dropdown with enhanced design */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="group flex items-center space-x-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200/50 text-gray-700 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:rotate-12">
                    <svg 
                      className="h-6 w-6" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2.5" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-bold text-gray-800">Administrator</div>
                  <div className="text-xs text-gray-500 font-medium">System Admin</div>
                </div>
                <svg
                  className={`h-5 w-5 text-gray-500 transition-transform duration-500 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Enhanced Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-64 origin-top-right rounded-2xl bg-white/98 backdrop-blur-xl border border-gray-200/60 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none transform animate-in slide-in-from-top-4 duration-300">
                  <div className="p-3">
                    <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-800">Administrator</p>
                          <p className="text-sm text-gray-600">Map My Travel Admin Panel</p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="group w-full flex items-center px-4 py-4 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium hover:shadow-lg transform hover:scale-105"
                    >
                      <div className="mr-4 p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-300">
                        <svg 
                          className="h-5 w-5 text-red-500 group-hover:text-red-600 transition-colors duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Sign Out</div>
                        <div className="text-xs text-gray-500">End admin session</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;