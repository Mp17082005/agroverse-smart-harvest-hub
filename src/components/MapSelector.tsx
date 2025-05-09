
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Wheat } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { toast } from '@/hooks/use-toast';

// Fix for default marker icon in Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

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

const defaultPosition = [20.5937, 78.9629]; // Center of India

interface LocationMarkerProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ onLocationSelect }: LocationMarkerProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
      toast({
        title: "Location selected",
        description: `Latitude: ${e.latlng.lat.toFixed(4)}, Longitude: ${e.latlng.lng.toFixed(4)}`,
      });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Your selected location<br />
        Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
      </Popup>
    </Marker>
  );
}

interface MapSelectorProps {
  onLocationSelect?: (location: Location) => void;
  navigateOnSelect?: boolean;
}

const MapSelector = ({ onLocationSelect, navigateOnSelect = true }: MapSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [customLocation, setCustomLocation] = useState<Location | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const filteredLocations = searchQuery 
    ? sampleLocations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleLocations;

  // Close location dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.location-search-container')) {
        setShowLocations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = (location: Location) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    
    if (navigateOnSelect) {
      navigate(`/location/${location.id}`);
    }
    
    setShowLocations(false);
  };

  const handleMapLocationSelect = (lat: number, lng: number) => {
    // Create a custom location object
    const newCustomLocation = {
      id: Math.floor(Math.random() * 10000), // Generate random ID
      name: `Custom Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      lat,
      lng
    };
    
    setCustomLocation(newCustomLocation);
    
    if (onLocationSelect) {
      onLocationSelect(newCustomLocation);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 bg-agro-green-light/10 flex items-center gap-3">
          <MapPin className="w-8 h-8 text-agro-green-dark flex-shrink-0" />
          <h2 className="text-xl font-semibold text-agro-green-dark">Select Your Farm Location</h2>
        </div>
        
        <div className="relative h-[400px] sm:h-[500px] bg-agro-sky/20 border-b border-t border-agro-green-light/30">
          <MapContainer 
            center={defaultPosition as [number, number]} 
            zoom={5} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Display pre-defined locations */}
            {sampleLocations.map(loc => (
              <Marker 
                key={loc.id} 
                position={[loc.lat, loc.lng]}
                eventHandlers={{
                  click: () => handleSelectLocation(loc),
                }}
              >
                <Popup>
                  <strong>{loc.name}</strong><br/>
                  Lat: {loc.lat.toFixed(4)}, Lng: {loc.lng.toFixed(4)}
                </Popup>
              </Marker>
            ))}
            
            {/* Allow user to select custom locations */}
            <LocationMarker onLocationSelect={handleMapLocationSelect} />
          </MapContainer>
          
          <div className="absolute top-4 left-4 right-4 z-[1000] bg-white/90 rounded-xl p-2 shadow-lg">
            <div className="text-center font-medium text-sm text-agro-brown-dark">
              <span className="bg-agro-yellow px-2 py-1 rounded text-agro-brown-dark">Tap on the map to select your exact farm location</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="relative location-search-container">
            <div className="flex items-center border-2 border-agro-green-light/50 rounded-lg overflow-hidden">
              <div className="pl-3">
                <Search className="w-6 h-6 text-agro-green-dark/70" />
              </div>
              <input
                type="text"
                placeholder={isMobile ? "Search farm..." : "Search your farm or enter location"}
                className="w-full p-4 outline-none text-lg"
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
                            className="w-full flex items-center gap-3 p-4 hover:bg-agro-green-light/10 rounded-lg text-left transition-colors large-touch-target"
                            onClick={() => handleSelectLocation(location)}
                          >
                            <MapPin className="w-6 h-6 text-agro-green-dark flex-shrink-0" />
                            <div>
                              <p className="font-medium text-lg">{location.name}</p>
                              <p className="text-sm text-agro-brown-light">
                                {location.lat.toFixed(2)}°, {location.lng.toFixed(2)}°
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center py-4 text-agro-brown-light text-lg">No locations found</p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center bg-agro-yellow/20 p-3 rounded-xl">
            <p className="text-agro-brown-dark text-lg flex items-center justify-center gap-2">
              <span className="bg-agro-yellow px-2 py-1 rounded text-agro-brown-dark font-bold">Tip:</span> 
              <span>Select your farm to get the best crop advice</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSelector;
