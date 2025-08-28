// services/mapService.js

const mapService = {
  // Cache for storing location data to avoid redundant API calls
  locationCache: {},
  
  // Clear location cache method
  clearLocationCache: function() {
    this.locationCache = {};
  },
  
  // Get coordinates for a place using Nominatim (OpenStreetMap's geocoding service)
  getCoordinates: async (placeName, region = "Pakistan") => {
    // Check cache first
    const cacheKey = `${placeName}-${region}`;
    if (mapService.locationCache[cacheKey]) {
      return mapService.locationCache[cacheKey];
    }
    
    try {
      // Append region to make search more specific
      const searchTerm = `${placeName}, ${region}`;
      
      // Use OpenStreetMap's Nominatim service for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchTerm)}&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'TravelPakistan/1.0', // It's good practice to identify your application
            'Accept-Language': 'en' // Prefer English results
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          displayName: data[0].display_name,
          type: data[0].type
        };
        
        // Cache the result
        mapService.locationCache[cacheKey] = result;
        
        return result;
      }
      
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  },
  
  // Get coordinates for all highlights of a destination
  getHighlightCoordinates: async (highlights, region) => {
    if (!highlights || !Array.isArray(highlights) || highlights.length === 0) {
      return [];
    }
    
    // Use predefined coordinates for common highlights when available
    // This reduces API calls and improves reliability
    const knownLocations = {
      // Hunza Valley
      "Altit Fort": { lat: 36.2322, lng: 74.6170, description: "Historic fort in Hunza Valley" },
      "Attabad Lake": { lat: 36.3503, lng: 74.8716, description: "Beautiful blue lake formed after a landslide" },
      "Passu Cones": { lat: 36.4680, lng: 74.8831, description: "Dramatic mountain peaks in Hunza" },
      // Hunza Valley


      
      // Skardu
      "Shangrila Resort Lower Kachura Lake": { lat: 35.3236, lng: 75.5701, description: "Luxury resort near a serene lake" },
      "Upper Kachura Lake": { lat: 35.3392, lng: 75.5539, description: "A picturesque high-altitude lake" },
      "Shigar Fort": { lat: 35.4290, lng: 75.7320, description: "Historic fort and heritage hotel" },
      
      // Swat Valley
      "Malam Jabba": { lat: 34.8137, lng: 72.5652, description: "Pakistan's only ski resort" },
      "Fizagat Park": { lat: 34.7810, lng: 72.3568, description: "Riverside recreational area" },
      "Kalam Valley": { lat: 35.4902, lng: 72.5846, description: "Beautiful valley in Swat region" },
      
      // Naran Kaghan
      "Saif-ul-Muluk Lake": { lat: 34.8877, lng: 73.6909, description: "Famous high-altitude lake with folklore" },
      "Lulusar Lake": { lat: 34.6902, lng: 73.6385, description: "One of the main sources of River Kunhar" },
      "Jalkhad": { lat: 34.6499, lng: 73.6333, description: "Beautiful spot along the Kaghan Valley" },
      
      // Kashmir
      "Arang Kel": { lat: 34.7924, lng: 74.3521, description: "Beautiful village in Neelum Valley" },
      "Ratti Gali Lake": { lat: 34.7799, lng: 74.1667, description: "High-altitude glacier lake" },
      "Banjosa Lake": { lat: 33.8011, lng: 73.7793, description: "Artificial lake surrounded by pine trees" },
      
      // Murree
      "Mall Road": { lat: 33.9070, lng: 73.3943, description: "Main shopping street in Murree" },
      "Patriata": { lat: 33.8500, lng: 73.4489, description: "Also known as New Murree or Chair Lift Point" },
      "Pindi Point": { lat: 33.9127, lng: 73.4087, description: "Famous viewpoint with chair lift" },

      
      // Fairy Meadows
      "Nanga Parbat Viewpoint": { lat: 35.3870, lng: 74.5784, description: "Viewing point for the ninth highest mountain" },
      "Beyal Camp": { lat: 35.3840, lng: 74.5862, description: "Base camp area near Fairy Meadows" },
      "Raikot Bridge & Jeep Track": { lat: 35.2927, lng: 74.6032, description: "Starting point for Fairy Meadows trek" },
      
      // Neelum Valley
      "Keran": { lat: 34.5547, lng: 73.9057, description: "Village on the Line of Control" },
      "Kel": { lat: 34.8071, lng: 74.3194, description: "Beautiful town in Neelum Valley" },
      "Chitta Katha Lake": { lat: 34.7582, lng: 74.1231, description: "High-altitude lake requiring trekking" },
      "Dhani Waterfall": { lat: 34.7388, lng: 74.0721, description: "Beautiful waterfall in Neelum Valley" },
      
      // Shogran
      "Siri Paye": { lat: 34.6186, lng: 73.4712, description: "Beautiful meadows above Shogran" },
      "Makra Peak": { lat: 34.6147, lng: 73.4977, description: "Popular trekking destination" },
      "Payee Meadows": { lat: 34.6118, lng: 73.4665, description: "Lush green meadows with mountain views" },
      "Scenic Pine Forests": { lat: 34.6076, lng: 73.4556, description: "Dense pine forests around Shogran" },
      "Shogran Meadows": {
  lat: 34.6280, 
  lng: 73.4906, 
  description: "Lush alpine meadows in Kaghan Valley, known for scenic views and access to Siri Paye Lakes"
},
      





    };
    
    // Create an array to store results
    const results = [];
    
    // Process each highlight with better error handling
    for (const highlight of highlights) {
      // Skip empty highlights
      if (!highlight || highlight.trim() === '') continue;
      
      try {
        // If we have predefined coordinates, use them
        if (knownLocations[highlight]) {
          results.push({
            name: highlight,
            ...knownLocations[highlight]
          });
          continue;
        }
        
        // Try to geocode the location using OpenStreetMap API
        const coordinates = await mapService.getCoordinates(highlight, region);
        
        if (coordinates && typeof coordinates.lat === 'number' && typeof coordinates.lng === 'number') {
          results.push({
            name: highlight,
            lat: coordinates.lat,
            lng: coordinates.lng,
            description: `Location in ${region}`
          });
          continue;
        }
        
        // If geocoding fails, use region-based approximate coordinates
        const regionCoordinates = {
          "Gilgit-Baltistan": { lat: 35.8805, lng: 74.4644 },
          "Khyber Pakhtunkhwa": { lat: 34.9526, lng: 72.3311 },
          "Azad Kashmir": { lat: 33.7298, lng: 73.7629 },
          "Punjab": { lat: 31.1471, lng: 75.3412 },
          "Sindh": { lat: 25.8943, lng: 68.5247 },
          "Balochistan": { lat: 28.4907, lng: 65.0958 },
          "Pakistan": { lat: 30.3753, lng: 69.3451 }
        };
        
        // Get coordinates for the broader region or default to Pakistan center
        let regionKey = region;
        // Try to match region with our known regions (allowing partial matches)
        if (!regionCoordinates[region]) {
          regionKey = Object.keys(regionCoordinates).find(key => 
            region.toLowerCase().includes(key.toLowerCase())
          ) || "Pakistan";
        }

        // Add this function in mapService.js
const clearLocationCache = () => {
  mapService.locationCache = {};
};

mapService.clearLocationCache = clearLocationCache;
        
        const fallbackCoords = regionCoordinates[regionKey] || regionCoordinates["Pakistan"];
        
        // Add small random offset for points that use the same fallback coordinates
        // so multiple points don't stack exactly on top of each other
        const latOffset = (Math.random() - 0.5) * 0.05;
        const lngOffset = (Math.random() - 0.5) * 0.05;
        
        results.push({
          name: highlight,
          lat: fallbackCoords.lat + latOffset,
          lng: fallbackCoords.lng + lngOffset,
          description: `Location in ${region}`,
          approximate: true
        });
      } catch (error) {
        console.error(`Error processing highlight '${highlight}':`, error);
        
        // Still add the highlight with default coordinates so it appears on the map
        results.push({
          name: highlight,
          lat: 30.3753, // Pakistan center coordinates
          lng: 69.3451,
          description: `Location in Pakistan`,
          approximate: true,
          error: true
        });
      }
    }
    
    return results;
  }
};

export default mapService;