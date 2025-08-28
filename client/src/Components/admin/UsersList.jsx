// src/components/admin/UsersList.jsx
import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminApi';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await adminService.getAllUsers();
        console.log('Users data received:', data); // Debug log to see what date fields are available
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load users. Please try again.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Enhanced function to format date - now properly handles real dates
  const formatJoinedDate = (user) => {
    // Priority order: createdAt -> createdate -> registrationDate -> _id creation time
    let dateToUse = null;
    
    // 1. Try createdAt field (most common)
    if (user.createdAt) {
      dateToUse = new Date(user.createdAt);
    }
    // 2. Try createdate field (as you mentioned you have this)
    else if (user.createdate) {
      dateToUse = new Date(user.createdate);
    }
    // 3. Try registrationDate field
    else if (user.registrationDate) {
      dateToUse = new Date(user.registrationDate);
    }
    // 4. Try to extract date from MongoDB ObjectId (if available)
    else if (user._id && typeof user._id === 'string' && user._id.length === 24) {
      try {
        // MongoDB ObjectId contains timestamp in first 4 bytes
        const timestamp = parseInt(user._id.substring(0, 8), 16) * 1000;
        dateToUse = new Date(timestamp);
      } catch (e) {
        console.warn('Could not extract date from ObjectId:', user._id);
      }
    }
    
    // If we have a valid date, format it nicely
    if (dateToUse && !isNaN(dateToUse.getTime())) {
      // Check if the date is reasonable (not in the future, not too old)
      const now = new Date();
      const oneYearAgo = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
      
      if (dateToUse <= now && dateToUse >= oneYearAgo) {
        return dateToUse.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    }
    
    // Fallback: show "Recently" instead of a fake date
    return 'Recently';
  };

  // Enhanced function to show relative time (like "2 days ago")
  const getRelativeTime = (user) => {
    let dateToUse = null;
    
    // Same priority order as formatJoinedDate
    if (user.createdAt) {
      dateToUse = new Date(user.createdAt);
    } else if (user.createdate) {
      dateToUse = new Date(user.createdate);
    } else if (user.registrationDate) {
      dateToUse = new Date(user.registrationDate);
    } else if (user._id && typeof user._id === 'string' && user._id.length === 24) {
      try {
        const timestamp = parseInt(user._id.substring(0, 8), 16) * 1000;
        dateToUse = new Date(timestamp);
      } catch (e) {
        return null;
      }
    }
    
    if (!dateToUse || isNaN(dateToUse.getTime())) {
      return null;
    }
    
    const now = new Date();
    const diffInMs = now - dateToUse;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center py-12">
        <div className="text-xl font-medium text-gray-700">
          <svg className="mr-3 inline h-6 w-6 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading users...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-red-800">
        <h2 className="text-lg font-medium">Error</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 rounded bg-red-100 px-4 py-2 font-medium text-red-800 hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
        <div className="mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400"
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
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                          {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatJoinedDate(user)}
                    </div>
                    {getRelativeTime(user) && (
                      <div className="text-xs text-gray-500">
                        {getRelativeTime(user)}
                      </div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold leading-5 ${user.isActive === false ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {user.isActive === false ? 'Inactive' : 'Active'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <span className={`${user.isAdmin ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                      {user.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                  {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;