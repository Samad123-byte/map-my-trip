// Add these imports at the top of your file
import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminApi';
import { convertUSDToPKR, formatPKR } from '../../utils/currencyUtils';
import { useTranslation } from 'react-i18next';

const DestinationsList = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  
  // New states for image upload and notifications
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Add confirmation modal states
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmTitle, setConfirmTitle] = useState('');
 
  
  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    if (typeof contentObj === 'object' && contentObj !== null) {
      // Try to get English version first, then fall back to any available translation
      return contentObj.en || Object.values(contentObj)[0] || fallback;
    }
    
    return contentObj;
  };

  // Notification system
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Confirmation modal helper
  const showConfirmation = (title, message, onConfirm) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => onConfirm);
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    setIsConfirmModalOpen(false);
    setConfirmAction(null);
  };

  const handleCancel = () => {
    setIsConfirmModalOpen(false);
    setConfirmAction(null);
  };

  // Image handling functions
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        addNotification('Please select a valid image file', 'error');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        addNotification('Image size should be less than 5MB', 'error');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

// Updated uploadImage function - replace the existing one
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    setIsUploading(true);
    
    // Try your existing admin service first
    if (adminService && adminService.uploadImage) {
      const response = await adminService.uploadImage(formData);
      return response.imageUrl || response.url || response.data?.imageUrl;
    }
    
    // Fallback to direct API call
    const response = await fetch('/api/admin/upload-image', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
    
    if (!response.ok) {
      // If the upload endpoint doesn't exist, convert to base64 as fallback
      if (response.status === 404) {
        console.warn('Upload endpoint not found, using base64 fallback');
        return await convertToBase64(file);
      }
      
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    return data.imageUrl || data.url || data.data?.imageUrl;
    
  } catch (error) {
    console.error('Image upload error:', error);
    
    // Fallback to base64 conversion for local preview
    if (error.message.includes('Failed to fetch') || error.message.includes('404')) {
      console.warn('API endpoint unavailable, converting to base64...');
      try {
        return await convertToBase64(file);
      } catch (base64Error) {
        console.error('Base64 conversion failed:', base64Error);
        throw new Error('Failed to process image. Please try using image URL instead.');
      }
    }
    
    throw new Error('Failed to upload image. Please check your connection and try again.');
  } finally {
    setIsUploading(false);
  }
};

// Add this helper function to convert file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
  
  // Form state for adding/editing
  const [formData, setFormData] = useState({
    name: {
      en: '',
      fr: '',
      es: '',
      de: '',
      zh: ''
    },
    location: '',
    price: '',
    description: {
      en: '',
      fr: '',
      es: '',
      de: '',
      zh: ''
    },
    available: true,
    image: '',
    highlights: {
      en: [],
      fr: [],
      es: [],
      de: [],
      zh: []
    }
  });

  // Add this state
const [highlightInputs, setHighlightInputs] = useState({
  en: '',
  fr: '',
  es: '',
  de: '',
  zh: ''
});
  
const addHighlight = (lang) => {
  const highlightToAdd = highlightInputs[lang].trim();
  if (highlightToAdd) {
    setFormData(prevData => ({
      ...prevData,
      highlights: {
        ...prevData.highlights,
        [lang]: [...(prevData.highlights[lang] || []), highlightToAdd]
      }
    }));

    // Clear the input for that language
    setHighlightInputs(prev => ({
      ...prev,
      [lang]: ''
    }));
  }
};

const removeHighlight = (lang, indexToRemove) => {
  setFormData(prevData => ({
    ...prevData,
    highlights: {
      ...prevData.highlights,
      [lang]: prevData.highlights[lang].filter((_, index) => index !== indexToRemove)
    }
  }));
};

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllDestinations();
      setDestinations(data);
      setError(null);
    } catch (err) {
      setError('Failed to load destinations. Please try again.');
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

 
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Check if the input is a multilingual field
    if (name.includes('name.') || name.includes('description.')) {
      const [field, lang] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [lang]: value
        }
      }));
    } else {
      // Handle regular input fields
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: {
        en: '',
        fr: '',
        es: '',
        de: '',
        zh: ''
      },
      location:'',
      price: '',
      description: {
        en: '',
        fr: '',
        es: '',
        de: '',
        zh: ''
      },
      available: true,
      image:  '',
      highlights: {
        en: [],
        fr: [],
        es: [],
        de: [],
        zh: []
      }
    });
    setHighlightInputs({
      en: '',
      fr: '',
      es: '',
      de: '',
      zh: ''
    });
    setImageFile(null);
    setImagePreview('');
  };

  const openAddModal = () => {
    setCurrentDestination(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (destination) => {
    setCurrentDestination(destination);

    setFormData({
      name:{
        en: destination.name?.en || destination.name || '',
        fr: destination.name?.fr || '',
        es: destination.name?.es || '',
        de: destination.name?.de || '',
        zh: destination.name?.zh || ''
      },
      location:  destination.location || '',
      price: destination.price && typeof destination.price === 'object' 
      ? destination.price['3days'] || '' 
      : destination.price || '',
      description: {
        en: destination.description?.en || destination.description || '',
        fr: destination.description?.fr || '',
        es: destination.description?.es || '',
        de: destination.description?.de || '',
        zh: destination.description?.zh || ''
      },
      available: destination.available || false,
      image: destination.image || '',
      highlights: {
        en: destination.highlights?.en || [],
        fr: destination.highlights?.fr || [],
        es: destination.highlights?.es || [],
        de: destination.highlights?.de || [],
        zh: destination.highlights?.zh || []
      }
    });
     // Reset highlight inputs and image states
    setHighlightInputs({
      en: '',
      fr: '',
      es: '',
      de: '',
      zh: ''
    });
    setImageFile(null);
    setImagePreview(destination.image || '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsUploading(true);
      let imageUrl = formData.image;
      
      // Upload new image if file is selected
      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile);
        } catch (uploadError) {
          addNotification('Failed to upload image. Please try again.', 'error');
          return;
        }
      }
      
      let result;
      const basePrice = parseFloat(formData.price) || 0;
    
      const cleanHighlights = {
        en: Array.isArray(formData.highlights.en) ? formData.highlights.en : [],
        fr: Array.isArray(formData.highlights.fr) ? formData.highlights.fr : [],
        es: Array.isArray(formData.highlights.es) ? formData.highlights.es : [],
        de: Array.isArray(formData.highlights.de) ? formData.highlights.de : [],
        zh: Array.isArray(formData.highlights.zh) ? formData.highlights.zh : []
      };
     
      // Convert price to number
      const submissionData = {
        name: {
          en: formData.name.en,
          fr: formData.name.fr || formData.name.en,
          es: formData.name.es || formData.name.en,
          de: formData.name.de || formData.name.en,
          zh: formData.name.zh || formData.name.en
        },
      location: formData.location,
      
      price: {
        '3days': parseFloat(formData.price) || 0,
          '5days': parseFloat(formData.price) * 1.2 || 0,
          '7days': parseFloat(formData.price) * 1.5 || 0
      },
      description: {
        en: formData.description.en,
        fr: formData.description.fr || formData.description.en,
        es: formData.description.es || formData.description.en,
        de: formData.description.de || formData.description.en,
        zh: formData.description.zh || formData.description.en
      },
      available: formData.available,
      image: imageUrl,
      highlights: cleanHighlights
      };
      
      if (currentDestination) {
        // Update existing destination
        result = await adminService.updateDestination(currentDestination._id, submissionData);
        setDestinations(destinations.map(d => 
          d._id === currentDestination._id ? result : d
        ));
        addNotification(`Destination "${getTranslatedContent(result.name)}" updated successfully!`, 'success');
      } else {
        // Create new destination
        result = await adminService.createDestination(submissionData);
        setDestinations([...destinations, result]);
        addNotification(`Destination "${getTranslatedContent(result.name)}" created successfully!`, 'success');
      }
      
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error saving destination:', err);
      addNotification(
        currentDestination 
          ? 'Failed to update destination. Please try again.' 
          : 'Failed to create destination. Please try again.',
        'error'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (destinationId) => {
    const destination = destinations.find(d => d._id === destinationId);
    const destinationName = getTranslatedContent(destination?.name, 'Unknown');
    
    // Show custom confirmation modal instead of window.confirm
    showConfirmation(
      'Delete Destination',
      `Are you sure you want to delete "${destinationName}"? This action cannot be undone.`,
      async () => {
        try {
          setProcessingId(destinationId);
          await adminService.deleteDestination(destinationId);
          setDestinations(destinations.filter(d => d._id !== destinationId));
          addNotification(`Destination "${destinationName}" deleted successfully!`, 'success');
        } catch (err) {
          console.error('Error deleting destination:', err);
          addNotification('Failed to delete destination. Please try again.', 'error');
        } finally {
          setProcessingId(null);
        }
      }
    );
  };

  const handleToggleAvailability = async (destinationId, currentAvailability) => {
    const destination = destinations.find(d => d._id === destinationId);
    const destinationName = getTranslatedContent(destination?.name, 'Unknown');
    
    try {
      setProcessingId(destinationId);
      await adminService.toggleDestinationAvailability(destinationId, !currentAvailability);
      setDestinations(destinations.map(d => 
        d._id === destinationId ? { ...d, available: !d.available } : d
      ));
      addNotification(
        `Destination "${destinationName}" ${!currentAvailability ? 'enabled' : 'disabled'} successfully!`, 
        'success'
      );
    } catch (err) {
      console.error('Error toggling destination availability:', err);
      addNotification('Failed to update destination availability. Please try again.', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredDestinations = destinations.filter(destination => {
    const name = getTranslatedContent(destination.name, "");
    const location = getTranslatedContent(destination.location, "");

    return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           location.toLowerCase().includes(searchTerm.toLowerCase());
});

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <div className="text-xl font-semibold text-gray-700">Loading destinations...</div>
          <div className="mt-2 text-sm text-gray-500">Please wait while we fetch your data</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-6">
        <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg ring-1 ring-red-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-800">Error Loading Data</h3>
              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchDestinations}
            className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-between rounded-lg px-4 py-3 shadow-lg transition-all duration-300 ${
              notification.type === 'success'
                ? 'bg-green-100 text-green-800 ring-1 ring-green-200'
                : 'bg-red-100 text-red-800 ring-1 ring-red-200'
            }`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-3 text-current hover:opacity-70"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
            {/* Modal Header */}
            <div className="flex items-center space-x-4 bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{confirmTitle}</h3>
                <p className="text-sm text-gray-600">This action requires confirmation</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4">
              <p className="text-gray-700">{confirmMessage}</p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 bg-gray-50 px-6 py-4">
              <button
                onClick={handleCancel}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
          <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Destinations Management</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your travel destinations and packages</p>
            </div>
            
            <div className="flex w-full flex-col space-y-3 md:w-auto md:flex-row md:space-x-3 md:space-y-0">
              {/* Search Input */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="block w-full rounded-xl border-0 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-600 sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Add Button */}
              <button
                className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white font-semibold shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={openAddModal}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Destination</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Destination
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Price Range
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((destination, index) => (
                    <tr key={destination._id} className={`transition-colors hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                          {destination.image && (
                            <div className="flex-shrink-0">
                              <img 
                                src={destination.image} 
                                alt={getTranslatedContent(destination.name)}
                                className="h-12 w-12 rounded-xl object-cover ring-2 ring-gray-200" 
                              />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {getTranslatedContent(destination.name)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              ID: {destination._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm text-gray-700">{getTranslatedContent(destination.location)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-medium text-gray-900">
                          {(() => {
                            // Check if destination has weekend/week/extended prices directly
                            if (destination.weekend || destination.week || destination.extended) {
                              const prices = [
                                destination.weekend, 
                                destination.week, 
                                destination.extended
                              ].filter(price => price !== undefined && price !== null);

                              return prices.length > 0
                                ? `${formatPKR(convertUSDToPKR(Math.min(...prices)))} - 
                                   ${formatPKR(convertUSDToPKR(Math.max(...prices)))}`
                                : 'N/A';
                            }

                            // Fallback to price object if direct prices are not available
                            if (destination.price && typeof destination.price === 'object') {
                              const priceValues = Object.values(destination.price)
                                .filter(price => price !== null && price !== undefined)
                                .map(price => convertUSDToPKR(price));

                              return priceValues.length > 0
                                ? `${formatPKR(Math.min(...priceValues))} - ${formatPKR(Math.max(...priceValues))}`
                                : 'N/A';
                            }

                            // Final fallback
                            return 'N/A';
                          })()}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          destination.available 
                            ? 'bg-green-100 text-green-800 ring-1 ring-green-200' 
                            : 'bg-red-100 text-red-800 ring-1 ring-red-200'
                        }`}>
                          <div className={`mr-1.5 h-2 w-2 rounded-full ${
                            destination.available ? 'bg-green-400' : 'bg-red-400'
                          }`}></div>
                          {destination.available ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => openEditModal(destination)}
                            className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleToggleAvailability(destination._id, destination.available)}
                            disabled={processingId === destination._id}
                            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                              destination.available
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-yellow-500'
                                : 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500'
                            }`}
                          >
                            {processingId === destination._id ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            ) : destination.available ? (
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14L5 9m0 0l3-3M5 9h11a2 2 0 012 2v2" />
                              </svg>
                            ) : (
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l7-7m0 0l-3.5 3.5M21 3L5 19l-2-2" />
                              </svg>
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(destination._id)}
                            disabled={processingId === destination._id}
                            className="rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {processingId === destination._id ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            ) : (
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <svg className="mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-lg font-medium text-gray-600">
                          {searchTerm 
                            ? 'No destinations match your search criteria' 
                            : 'No destinations found'}
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                          {searchTerm 
                            ? 'Try adjusting your search terms' 
                            : 'Get started by adding your first destination'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Destination Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentDestination ? 'Edit Destination' : 'Add New Destination'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {currentDestination ? 'Update destination information' : 'Create a new travel destination'}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Section */}
                  <div className="rounded-xl bg-gray-50 p-6">
                    <h4 className="mb-4 text-lg font-semibold text-gray-900">Destination Name</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {['en', 'fr', 'es', 'de', 'zh'].map((lang) => (
                        <div key={lang}>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            {lang === 'en' ? '🇺🇸 English' : 
                             lang === 'fr' ? '🇫🇷 French' : 
                             lang === 'es' ? '🇪🇸 Spanish' : 
                             lang === 'de' ? '🇩🇪 German' : 
                             '🇨🇳 Chinese'}
                            {lang === 'en' && <span className="text-red-500">*</span>}
                          </label>
                          <input
                            type="text"
                            name={`name.${lang}`} 
                            value={formData.name[lang]} 
                            onChange={handleInputChange}
                            className="w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
                            required={lang === 'en'}
                            placeholder={`Enter ${lang === 'en' ? 'English' : lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : lang === 'de' ? 'German' : 'Chinese'} name`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location & Price Section */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-xl bg-gray-50 p-6">
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">Location Details</h4>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        📍 Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
                        required
                        placeholder="Enter destination location"
                      />
                    </div>
                    
                    <div className="rounded-xl bg-gray-50 p-6">
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">Pricing</h4>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        💰 Base Price (PKR) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={
                          typeof formData.price === 'object' 
                            ? Object.values(formData.price)[0] || '' 
                            : formData.price || ''
                        }
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
                        required
                        min="0"
                        step="0.01"
                        placeholder="Enter base price"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Prices for 5-day and 7-day packages will be calculated automatically
                      </p>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="rounded-xl bg-gray-50 p-6">
                    <h4 className="mb-4 text-lg font-semibold text-gray-900">Description</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {['en', 'fr', 'es', 'de', 'zh'].map((lang) => (
                        <div key={lang}>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            {lang === 'en' ? '🇺🇸 English' : 
                             lang === 'fr' ? '🇫🇷 French' : 
                             lang === 'es' ? '🇪🇸 Spanish' : 
                             lang === 'de' ? '🇩🇪 German' : 
                             '🇨🇳 Chinese'}
                            {lang === 'en' && <span className="text-red-500">*</span>}
                          </label>
                          <textarea
                            name={`description.${lang}`}
                            value={formData.description[lang] || ''}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
                            rows="4"
                            required={lang === 'en'}
                            placeholder={`Enter ${lang === 'en' ? 'English' : lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : lang === 'de' ? 'German' : 'Chinese'} description`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

        {/* Image & Availability Section */}
<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
  <div className="rounded-xl bg-gray-50 p-6">
    <h4 className="mb-4 text-lg font-semibold text-gray-900">Image</h4>
    
    {/* File Upload Section */}
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        📷 Upload Image
      </label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mb-2"></div>
                <p className="text-sm text-gray-500">Uploading...</p>
              </div>
            ) : (
              <>
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>

    {/* OR Divider */}
    <div className="flex items-center my-4">
      <div className="flex-1 border-t border-gray-300"></div>
      <span className="px-3 text-sm text-gray-500 bg-gray-50">OR</span>
      <div className="flex-1 border-t border-gray-300"></div>
    </div>

    {/* URL Input Section */}
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        🖼️ Image URL
      </label>
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleInputChange}
        className="w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
        placeholder="https://example.com/image.jpg"
      />
    </div>

    {/* Image Preview */}
    {(imagePreview || formData.image) && (
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium text-gray-700">Preview:</p>
        <div className="relative inline-block">
          <img 
            src={imagePreview || formData.image} 
            alt="Preview" 
            className="h-24 w-24 rounded-lg object-cover ring-2 ring-gray-200"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {imageFile && (
            <div className="absolute -top-2 -right-2">
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview('');
                }}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
        {imageFile && (
          <p className="mt-2 text-xs text-green-600">
            ✓ New image selected: {imageFile.name}
          </p>
        )}
      </div>
    )}
  </div>
                    
                    <div className="rounded-xl bg-gray-50 p-6">
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">Availability</h4>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="available"
                          checked={formData.available}
                          onChange={handleInputChange}
                          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="text-sm font-medium text-gray-700">
                          ✅ Available for booking
                        </label>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Toggle this to control whether customers can book this destination
                      </p>
                    </div>
                  </div>

                  {/* Highlights Section */}
                  <div className="rounded-xl bg-gray-50 p-6">
                    <h4 className="mb-4 text-lg font-semibold text-gray-900">Destination Highlights</h4>
                    {['en', 'fr', 'es', 'de', 'zh'].map((lang) => (
                      <div key={lang} className="mb-6 rounded-lg bg-white p-4 ring-1 ring-gray-200">
                        <label className="mb-3 block text-sm font-semibold text-gray-700">
                          {lang === 'en' ? '🇺🇸 English' : 
                           lang === 'fr' ? '🇫🇷 French' : 
                           lang === 'es' ? '🇪🇸 Spanish' : 
                           lang === 'de' ? '🇩🇪 German' : 
                           '🇨🇳 Chinese'} Highlights
                        </label>
                        <div className="flex mb-3">
                          <input
                            type="text"
                            value={highlightInputs[lang]}
                            onChange={(e) => setHighlightInputs(prev => ({
                              ...prev,
                              [lang]: e.target.value
                            }))}
                            placeholder={`Enter ${lang} highlight`}
                            className="flex-1 rounded-l-lg border-0 bg-gray-50 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addHighlight(lang);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => addHighlight(lang)}
                            className="rounded-r-lg bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Add
                          </button>
                        </div>

                        {formData.highlights[lang] && formData.highlights[lang].length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-600">Current Highlights:</p>
                            <div className="space-y-1">
                              {formData.highlights[lang].map((highlight, index) => (
                                <div 
                                  key={index} 
                                  className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 text-sm"
                                >
                                  <span className="text-blue-900">{highlight}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeHighlight(lang, index)}
                                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                                  >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Modal Footer */}
                  <div className="sticky bottom-0 flex justify-end space-x-4 border-t border-gray-200 bg-white pt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {currentDestination ? 'Update Destination' : 'Create Destination'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsList;