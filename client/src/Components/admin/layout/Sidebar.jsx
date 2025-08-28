import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
     
    },
    { 
      name: 'Users', 
      path: '/admin/users', 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
     
    },
    { 
      name: 'Bookings', 
      path: '/admin/bookings', 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
     
    },
    { 
      name: 'Destinations', 
      path: '/admin/destinations', 
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      
    },
    { 
      name: 'Reviews', 
      path: '/admin/reviews', 
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      
    },
    {
      name: 'Custom Tours', 
      path: '/admin/custom-tours', 
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
     
    },
    {
      name: 'Contact Management', 
      path: '/admin/contacts', 
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      name: 'Chatbot Feedback', 
      path: '/admin/chatbot-feedback', 
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    }
  ];

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const sidebarWidth = collapsed ? 'w-20' : 'w-72';

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 ${sidebarWidth} transform overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-2xl transition-all duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #1e1b4b 75%, #0f172a 100%)',
        }}
      >
        {/* Header Section */}
        <div className="relative border-b border-purple-500/20 bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-xl">
          <div className="flex items-center justify-between p-4">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg ring-2 ring-purple-400/30">
                    <svg 
                      className="h-7 w-7 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                      />
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-slate-900">
                    <div className="h-full w-full animate-pulse rounded-full bg-emerald-400"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Travel Admin
                  </h1>
                  <p className="text-xs text-purple-300/70 font-medium">Management Panel</p>
                </div>
              </div>
            )}
            {collapsed && (
              <div className="relative mx-auto">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg ring-2 ring-purple-400/30">
                  <svg 
                    className="h-7 w-7 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                    />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-slate-900">
                  <div className="h-full w-full animate-pulse rounded-full bg-emerald-400"></div>
                </div>
              </div>
            )}
            <button
              className="rounded-lg p-2 text-purple-200 transition-all duration-200 hover:bg-purple-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              onClick={handleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                className="h-5 w-5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {collapsed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 ring-1 ring-purple-400/50'
                        : 'text-slate-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:text-white hover:shadow-md'
                    } ${collapsed ? 'justify-center' : 'justify-start'}`
                  }
                  end={item.path === '/admin'}
                >
                  <div className="relative">
                    <svg
                      className={`${
                        collapsed ? 'h-6 w-6' : 'h-5 w-5 mr-3'
                      } transition-all duration-200`}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d={item.icon}></path>
                    </svg>
                  </div>
                  {!collapsed && (
                    <div className="flex flex-1 items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      {item.badge && (
                        <span className="ml-2 rounded-full bg-purple-500/30 px-2 py-0.5 text-xs font-semibold text-purple-200 ring-1 ring-purple-400/50">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                  {/* Active indicator */}
                  <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b from-purple-400 to-blue-400 opacity-0 transition-opacity duration-200 group-[.active]:opacity-100"></div>
                </NavLink>
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                    <div className="relative rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white shadow-xl ring-1 ring-slate-700">
                      <div className="flex items-center space-x-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="rounded-full bg-purple-500/30 px-2 py-0.5 text-xs font-semibold text-purple-200">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Status Section */}
        <div className="border-t border-purple-500/20 bg-gradient-to-r from-slate-800/50 to-purple-900/30 backdrop-blur-xl">
          {!collapsed ? (
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50">
                      <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-300">System Online</p>
                    <p className="text-xs text-slate-400">All services running</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-purple-300">v2.1.0</p>
                  <p className="text-xs text-slate-500">Pro</p>
                </div>
              </div>
              
            </div>
          ) : (
            <div className="flex justify-center p-4">
              <div className="relative">
                <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50">
                  <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;