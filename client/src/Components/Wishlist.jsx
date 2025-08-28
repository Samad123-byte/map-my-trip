import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { wishlistService } from '../services/api';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../App';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState({ destinations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [destinationToRemove, setDestinationToRemove] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [animateItems, setAnimateItems] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const destinationsPerPage = 6;
  const { t, i18n } = useTranslation();
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Trigger animation after data is loaded
  useEffect(() => {
    if (!loading && wishlist.destinations.length > 0) {
      setTimeout(() => {
        setAnimateItems(true);
      }, 100);
    }
  }, [loading, wishlist.destinations.length]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const data = await wishlistService.getWishlist();
      setWishlist(data);
      setError(null);
    } catch (err) {
      setError(t('failedToLoadWishlist'));
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTranslatedContent = (contentObj, fallback = "") => {
    if (!contentObj) return fallback;
    
    const currentLang = i18n.language || 'en';
    
    if (typeof contentObj === 'object') {
      return contentObj[currentLang] || contentObj.en || Object.values(contentObj)[0] || fallback;
    }
    
    return contentObj;
  };

  const confirmRemoval = (destinationId) => {
    setDestinationToRemove(destinationId);
    setShowConfirmation(true);
  };

  const cancelRemoval = () => {
    setShowConfirmation(false);
    setDestinationToRemove(null);
  };

  const removeFromWishlist = async () => {
    if (!destinationToRemove) return;
    
    try {
      setRemovingId(destinationToRemove);
      await wishlistService.removeFromWishlist(destinationToRemove);
      
      // Add a brief delay before updating state to allow for remove animation
      setTimeout(() => {
        setWishlist(prev => ({
          ...prev,
          destinations: prev.destinations.filter(dest => dest._id !== destinationToRemove)
        }));
        setShowConfirmation(false);
        setDestinationToRemove(null);
        setRemovingId(null);
      }, 500);
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      setError(t('failedToRemoveFromWishlist'));
      setRemovingId(null);
    }
  };

  const getImageUrl = (destination) => {
    if (destination.image) {
      return destination.image;
    }
    
    if (!destination.images || !destination.images.length) {
      return '/images/placeholder.jpg';
    }
    
    let imagePath = destination.images[0];
    
    if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
      imagePath = `/${imagePath}`;
    }
    
    return imagePath;
  };

  // Pagination with animation
  const handlePaginate = (pageNumber) => {
    // Reset animations when changing page
    setAnimateItems(false);
    setCurrentPage(pageNumber);
    
    // Re-trigger animations after page change
    setTimeout(() => {
      setAnimateItems(true);
    }, 100);
  };

  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = wishlist.destinations.slice(indexOfFirstDestination, indexOfLastDestination);
  const totalPages = Math.ceil(wishlist.destinations.length / destinationsPerPage);

  // Loading skeleton with enhanced animations
  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50'}`}>
        <div className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className={`inline-block h-12 w-64 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg animate-pulse mb-4`}></div>
              <div className={`h-6 w-96 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-md mx-auto animate-pulse`}></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div 
                  key={item} 
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-100'} shadow-lg animate-pulse`}
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    opacity: 0
                  }}
                >
                  <div className={`h-56 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} relative overflow-hidden`}>
                    <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-600' : 'bg-gradient-to-r from-gray-200 to-gray-300'}`}
                      style={{ 
                        animation: 'shimmer 1.5s infinite',
                        backgroundSize: '200% 100%'
                      }}
                    ></div>
                  </div>
                  <div className="p-6">
                    <div className={`h-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg w-3/4 mb-3`}></div>
                    <div className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-md w-1/2 mb-4`}></div>
                    <div className={`h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-md w-full mb-6`}></div>
                    <div className={`h-10 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg w-full`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CSS animations for loading state */}
        <style jsx="true">{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50'}`}>
      {/* Modern Hero Section */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-5xl md:text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 tracking-tight`}>
              {t('myWishlist')}
            </h1>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed animate-fadeIn`}>
              {t('saveYourDreamDestinations')}
            </p>
            <div className="mt-8 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto animate-extendWidth"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {error && (
          <div className="mb-8 animate-shake">
            <div className={`${darkMode ? 'bg-red-900/50 border-red-500' : 'bg-red-50 border-red-200'} border-l-4 rounded-r-lg p-4 shadow-lg`}>
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-10 h-10 ${darkMode ? 'bg-red-800' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                  <svg className={`h-5 w-5 ${darkMode ? 'text-red-400' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className={`font-medium ${darkMode ? 'text-red-300' : 'text-red-800'}`}>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {wishlist.destinations.length === 0 ? (
          <div className="flex items-center justify-center min-h-96">
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl border shadow-2xl p-12 text-center max-w-md mx-auto animate-fadeInUp`}>
              <div className={`mx-auto w-24 h-24 ${darkMode ? 'bg-blue-900/50' : 'bg-blue-50'} rounded-full flex items-center justify-center mb-8 animate-bounce`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                {t('wishlistEmpty')}
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 text-lg leading-relaxed`}>
                {t('addDestinationsToStart')}
              </p>
              <Link 
                to="/destinations" 
                className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl shadow-lg`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {t('exploreDestinations')}
              </Link>
            </div>
          </div>
        ) : (
          <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-gray-200'} backdrop-blur-sm rounded-3xl border shadow-2xl p-8 animate-fadeIn`}>
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
              <div className="mb-6 sm:mb-0">
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                  {t('savedDestinations')}
                </h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
                  {wishlist.destinations.length} {wishlist.destinations.length === 1 ? 'destination' : 'destinations'} saved
                </p>
              </div>
              
              <Link 
                to="/destinations" 
                className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {t('addMore')}
              </Link>
            </div>
            
            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentDestinations.map((destination, index) => (
                <div 
                  key={destination._id} 
                  className={`group ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border overflow-hidden transition-all duration-500 ease-in-out transform ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${removingId === destination._id ? 'scale-90 opacity-0' : 'hover:-translate-y-2 hover:shadow-2xl'} shadow-lg`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={getImageUrl(destination)} 
                      alt={getTranslatedContent(destination.name, t('unnamedDestination'))} 
                      className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Remove Button */}
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => confirmRemoval(destination._id)}
                        className={`w-10 h-10 ${darkMode ? 'bg-gray-900/80 hover:bg-red-900/80' : 'bg-white/90 hover:bg-red-50'} backdrop-blur-sm rounded-full flex items-center justify-center ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'} transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12 shadow-lg`}
                        aria-label={t('remove')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Wishlist Badge */}
                    <div className="absolute bottom-4 left-4 animate-fadeInRight" style={{ animationDelay: `${index * 150 + 300}ms` }}>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {t('wishlist')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300`}>
                      {getTranslatedContent(destination.name, t('unnamedDestination'))}
                    </h3>
                    
                    {destination.location && (
                      <div className={`flex items-center mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-medium truncate">{destination.location}</span>
                      </div>
                    )}
                    
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-6 line-clamp-2 leading-relaxed`}>
                      {getTranslatedContent(destination.description, '')}
                    </p>
                    
                    <Link 
                      to={`/destinations/${destination._id}`} 
                      className="group/btn relative block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg hover:shadow-xl overflow-hidden"
                    >
                      <span className="relative z-10">{t('viewDetails')}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Modern Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2 animate-fadeInUp">
                  <button
                    onClick={() => handlePaginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === 1 
                        ? `${darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed` 
                        : `${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'} hover:scale-105 shadow-lg hover:shadow-xl`
                    }`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('previous')}
                  </button>
                  
                  <div className="flex space-x-1">
                    {[...Array(totalPages).keys()].map(number => (
                      <button
                        key={number + 1}
                        onClick={() => handlePaginate(number + 1)}
                        className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                          currentPage === number + 1
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'} hover:scale-110 shadow-md hover:shadow-lg`
                        }`}
                      >
                        {number + 1}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePaginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? `${darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                        : `${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'} hover:scale-105 shadow-lg hover:shadow-xl`
                    }`}
                  >
                    {t('next')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        )}

        {/* Modern Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div 
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl border p-8 max-w-md mx-4 shadow-2xl animate-modalAppear`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${darkMode ? 'bg-red-900/50' : 'bg-red-50'} mb-6 animate-pulse`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${darkMode ? 'text-red-400' : 'text-red-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 animate-fadeInDown`} style={{ animationDelay: '0.1s' }}>
                  {t('confirmRemoval')}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg leading-relaxed animate-fadeInDown`} style={{ animationDelay: '0.2s' }}>
                  {t('removeConfirmationText')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={cancelRemoval}
                  className={`flex-1 px-6 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'} border rounded-xl font-semibold transition-all duration-300 animate-fadeInUp`}
                  style={{ animationDelay: '0.3s' }}
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={removeFromWishlist}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 animate-fadeInUp hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ animationDelay: '0.4s' }}
                >
                  {t('remove')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced Global CSS animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes extendWidth {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.5s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        .animate-extendWidth {
          animation: extendWidth 1s ease-out forwards;
        }
        
        .animate-modalAppear {
          animation: modalAppear 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default Wishlist;