
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

const sampleLocations: Location[] = [
  { id: 1, name: "North Field", lat: 28.7041, lng: 77.1025 },
  { id: 2, name: "South Field", lat: 19.0760, lng: 72.8777 },
  { id: 3, name: "East Farm", lat: 22.5726, lng: 88.3639 },
  { id: 4, name: "West Plantation", lat: 18.5204, lng: 73.8567 }
];

interface MapSelectorProps {
  onLocationSelect?: (location: Location) => void;
  navigateOnSelect?: boolean;
}

const MapSelector = ({ onLocationSelect, navigateOnSelect = true }: MapSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const navigate = useNavigate();

  const filteredLocations = searchQuery 
    ? sampleLocations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleLocations;

  const handleSelectLocation = (location: Location) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    
    if (navigateOnSelect) {
      navigate(`/location/${location.id}`);
    }
    
    setShowLocations(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 bg-agro-green-light/10 flex items-center gap-3">
          <MapPin className="w-6 h-6 text-agro-green-dark flex-shrink-0" />
          <h2 className="text-xl font-semibold text-agro-green-dark">Select Your Farm Location</h2>
        </div>
        
        <div className="relative h-[300px] sm:h-[400px] bg-agro-sky/20 border-b border-t border-agro-green-light/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 bg-white/80 rounded-xl shadow-sm">
              <p className="mb-2 text-agro-brown-dark">Interactive map will appear here</p>
              <p className="text-sm text-agro-brown-light">(In a real implementation, this would be an actual map interface)</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <div className="flex items-center border-2 border-agro-green-light/50 rounded-lg overflow-hidden">
              <div className="pl-3">
                <Search className="w-5 h-5 text-agro-green-dark/70" />
              </div>
              <input
                type="text"
                placeholder="Search your farm or enter location"
                className="w-full p-3 outline-none text-lg"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowLocations(true);
                }}
                onFocus={() => setShowLocations(true)}
              />
            </div>
            
            {showLocations && (
              <div className="absolute left-0 right-0 mt-2 bg-white shadow-xl rounded-lg z-10 max-h-60 overflow-y-auto animate-fade-in">
                <div className="p-2">
                  {filteredLocations.length > 0 ? (
                    <ul>
                      {filteredLocations.map(location => (
                        <li key={location.id}>
                          <button
                            className="w-full flex items-center gap-3 p-3 hover:bg-agro-green-light/10 rounded-lg text-left transition-colors"
                            onClick={() => handleSelectLocation(location)}
                          >
                            <MapPin className="w-5 h-5 text-agro-green-dark flex-shrink-0" />
                            <div>
                              <p className="font-medium">{location.name}</p>
                              <p className="text-sm text-agro-brown-light">
                                {location.lat.toFixed(2)}°, {location.lng.toFixed(2)}°
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center py-3 text-agro-brown-light">No locations found</p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <p className="mt-4 text-center text-agro-brown-light">
            <span className="bg-agro-yellow/20 px-2 py-1 rounded text-agro-brown-dark">Tip:</span> Select your farm location to get personalized recommendations
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapSelector;
