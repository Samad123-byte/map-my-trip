import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminApi';
import { format } from 'date-fns';

const AdminContactPanel = () => {
  // State management
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentContact, setCurrentContact] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [activeTab, setActiveTab] = useState('notes');

  // API interaction functions
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const filters = statusFilter ? { status: statusFilter } : {};
      const data = await adminService.getAllContacts(filters);
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts. Please try again.');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const data = await adminService.getContactStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  // Initialize data on component mount and when filter changes
  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [statusFilter]);

  // Contact management functions
  const handleStatusChange = async (id, status) => {
    try {
      await adminService.updateContactStatus(id, status);
      fetchContacts();
      if (currentContact && currentContact._id === id) {
        setCurrentContact(prevContact => ({ ...prevContact, status }));
      }
    } catch (err) {
      setError('Failed to update contact status.');
      console.error('Status update error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await adminService.deleteContact(id);
        fetchContacts();
        if (currentContact && currentContact._id === id) {
          setCurrentContact(null);
        }
      } catch (err) {
        setError('Failed to delete contact.');
        console.error('Delete error:', err);
      }
    }
  };

  const viewContactDetails = (contact) => {
    setCurrentContact(contact);
    setAdminNotes(contact.adminNotes || '');
    setReplyText('');
    
    // Auto-mark as read when viewing unread messages
    if (contact.status === 'unread') {
      handleStatusChange(contact._id, 'read');
    }
  };

  const saveAdminNotes = async () => {
    if (!currentContact) return;
    
    try {
      await adminService.updateContactAdminNotes(currentContact._id, adminNotes);
      setCurrentContact(prevContact => ({ ...prevContact, adminNotes }));
      alert('Notes saved successfully.');
    } catch (err) {
      setError('Failed to save notes.');
      console.error('Notes save error:', err);
    }
  };

  const sendReply = async () => {
    if (!currentContact || !replyText.trim()) return;
    
    try {
      await adminService.updateContactStatus(currentContact._id, 'replied');
      // Here you would typically also send the email via an API call
      alert('Reply sent successfully.');
      setReplyText('');
      fetchContacts(); // Refresh the list
    } catch (err) {
      setError('Failed to send reply.');
      console.error('Reply error:', err);
    }
  };

  // UI helper functions
  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      unread: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm',
      read: 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-sm',
      replied: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm',
      default: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-sm'
    };
    
    return statusClasses[status] || statusClasses.default;
  };

  // Render component
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Contact Management
          </h1>
          <p className="text-slate-600">Manage and respond to customer inquiries</p>
        </div>

        {/* Filters and Stats Panel */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div className="relative">
              <select
                className="appearance-none bg-white border-2 border-slate-200 rounded-xl px-4 py-3 pr-8 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter contacts by status"
              >
                <option value="">All Contacts</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={fetchContacts}
              aria-label="Refresh contacts list"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </span>
            </button>
          </div>

          {/* Stats Display */}
          {!statsLoading && stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Contacts</p>
                    <p className="text-3xl font-bold">{stats.totalContacts || 0}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m2 4h6m-6 4h6m-6-8h6m-6 4h6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium">Unread</p>
                    <p className="text-3xl font-bold">{stats.unreadCount || 0}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">This Month</p>
                    <p className="text-3xl font-bold">{stats.monthlyTrend?.at(-1)?.count || 0}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact List Panel */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6">
              <h2 className="text-xl font-bold">Contacts ({contacts.length})</h2>
            </div>
            
            <div className="overflow-y-auto max-h-[70vh]">
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                    <p className="text-slate-600">Loading contacts...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="p-6">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              ) : contacts.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-slate-500 font-medium">No contacts found</p>
                  <p className="text-slate-400 text-sm">Contacts will appear here when submitted</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {contacts.map((contact) => (
                    <div
                      key={contact._id}
                      onClick={() => viewContactDetails(contact)}
                      className={`p-6 hover:bg-slate-50 cursor-pointer transition-all duration-200 ${
                        currentContact?._id === contact._id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-slate-800 truncate">{contact.name}</h3>
                        <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                          {format(new Date(contact.createdAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {contact.subject || 'No Subject'}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadgeClass(contact.status)}`}>
                          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact._id);
                          }}
                          className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                          aria-label="Delete contact"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contact Details Panel */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
            {currentContact ? (
              <div className="h-full flex flex-col">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{currentContact.subject || 'No Subject'}</h2>
                      <p className="text-slate-200">
                        From: <span className="font-medium">{currentContact.name}</span> ({currentContact.email})
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-sm font-medium ${getStatusBadgeClass(currentContact.status)}`}>
                      {currentContact.status.charAt(0).toUpperCase() + currentContact.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 mb-6">
                    <h3 className="font-medium text-slate-700 mb-3">Message:</h3>
                    <p className="whitespace-pre-wrap text-slate-800 leading-relaxed">{currentContact.message}</p>
                  </div>
                  
                  {/* Tabs */}
                  <div className="border-b border-slate-200 mb-6">
                    <div className="flex space-x-8">
                      <button 
                        className={`pb-4 px-1 font-medium transition-colors relative ${activeTab === 'notes' 
                          ? 'text-blue-600' 
                          : 'text-slate-500 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('notes')}
                      >
                        Admin Notes
                        {activeTab === 'notes' && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                      <button 
                        className={`pb-4 px-1 font-medium transition-colors relative ${activeTab === 'reply' 
                          ? 'text-blue-600' 
                          : 'text-slate-500 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('reply')}
                      >
                        Send Reply
                        {activeTab === 'reply' && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="space-y-6">
                    {activeTab === 'notes' && (
                      <>
                        <textarea
                          className="w-full border-2 border-slate-200 rounded-xl p-4 min-h-[150px] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          placeholder="Add internal notes about this contact..."
                          aria-label="Admin notes"
                        />
                        <button 
                          onClick={saveAdminNotes} 
                          className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save Notes
                          </span>
                        </button>
                      </>
                    )}
                    
                    {activeTab === 'reply' && (
                      <>
                        <textarea
                          className="w-full border-2 border-slate-200 rounded-xl p-4 min-h-[150px] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply here..."
                          aria-label="Reply text"
                        />
                        <button 
                          onClick={sendReply} 
                          disabled={!replyText.trim()}
                          className={`font-medium px-6 py-3 rounded-xl shadow-lg transition-all duration-200 ${
                            replyText.trim() 
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl transform hover:-translate-y-0.5' 
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Send Reply
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center py-16">
                  <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">Select a Contact</h3>
                  <p className="text-slate-500">Choose a contact from the list to view details and respond</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactPanel;