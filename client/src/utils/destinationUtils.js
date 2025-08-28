// In utils/destinationUtils.js
export const getHighlightsArray = (destination, currentLang = 'en') => {
  if (!destination || !destination.highlights) return [];
  
  // Handle object format with language keys
  if (typeof destination.highlights === 'object' && !Array.isArray(destination.highlights)) {
    // Try current language first, then English, then first available language
    return destination.highlights[currentLang] || 
           destination.highlights.en || 
           Object.values(destination.highlights)[0] || 
           [];
  }
  
  // Handle array format
  if (Array.isArray(destination.highlights)) {
    return destination.highlights;
  }
  
  return [];
};