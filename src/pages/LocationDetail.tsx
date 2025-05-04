
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CloudSun, Wheat, Microscope, MessageSquare, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { fetchSoilData, type SoilData } from '@/utils/soilService';
import { fetchWeatherData, getWeatherIconUrl } from '@/utils/weatherService';
import { getSuggestedCropsForLocation, type CropSuggestion } from '@/utils/cropService';
import CropSuggestionTab from '@/components/CropSuggestionTab';
import SoilInfoDisplay from '@/components/SoilInfoDisplay';

interface LocationParams {
  id: string;
  [key: string]: string | undefined;
}

interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

const LocationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<LocationParams>();
  const locationId = parseInt(id || "0", 10);
  
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [cropSuggestions, setCropSuggestions] = useState<CropSuggestion[]>([]);
  const [activeTab, setActiveTab] = useState("crop-suggestion");

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        // In a real app, fetch this from an API
        // For now, use mock data
        const sampleLocations = [
          { id: 1, name: "North Field", lat: 28.7041, lng: 77.1025 },
          { id: 2, name: "South Field", lat: 19.0760, lng: 72.8777 },
          { id: 3, name: "East Farm", lat: 22.5726, lng: 88.3639 },
          { id: 4, name: "West Plantation", lat: 18.5204, lng: 73.8567 }
        ];
        
        const locationData = sampleLocations.find(loc => loc.id === locationId);
        
        if (!locationData) {
          console.error("Location not found");
          navigate("/");
          return;
        }
        
        setLocation(locationData);
        
        // Fetch weather data
        const weather = await fetchWeatherData(locationData.lat, locationData.lng);
        setWeatherData(weather);
        
        // Fetch soil data
        const soil = await fetchSoilData(locationData.lat, locationData.lng);
        setSoilData(soil);
        
        // Get crop suggestions
        const crops = await getSuggestedCropsForLocation(
          locationData.lat,
          locationData.lng,
          weather.temperature,
          weather.humidity
        );
        setCropSuggestions(crops);
        
      } catch (error) {
        console.error("Error fetching location data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLocationData();
  }, [locationId, navigate]);
  
  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-agro-green-light/5">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-agro-green-dark border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-agro-brown-dark">Loading farm data...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-agro-green-light/5">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Back Button & Location Info */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="mr-3 touch-target"
          >
            <ArrowLeft className="w-5 h-5 text-agro-green-dark" />
          </Button>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-agro-green-dark">{location?.name}</h1>
            <p className="text-agro-brown-light">
              {location?.lat.toFixed(4)}°, {location?.lng.toFixed(4)}°
            </p>
          </div>
        </div>
        
        {/* Weather and Soil Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {weatherData && (
            <Card className="bg-white shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <CloudSun className="w-6 h-6 mr-2 text-agro-orange" />
                  <span>Current Weather</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">{weatherData.temperature.toFixed(1)}°C</p>
                    <p className="text-agro-brown-light">{weatherData.description}</p>
                    <p className="text-agro-brown-light">Humidity: {weatherData.humidity}%</p>
                  </div>
                  <div>
                    <img 
                      src={getWeatherIconUrl(weatherData.icon)} 
                      alt={weatherData.description}
                      width="80"
                      height="80"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {soilData && <SoilInfoDisplay soilData={soilData} />}
        </div>
        
        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="bg-white mb-6 p-1 w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="crop-suggestion" className="flex gap-2 data-[state=active]:bg-agro-green-light/20 data-[state=active]:text-agro-green-dark py-3">
              <Wheat className="w-5 h-5" />
              <span className="hidden sm:inline">Crop Suggestion</span>
              <span className="sm:hidden">Crops</span>
            </TabsTrigger>
            <TabsTrigger value="disease-detection" className="flex gap-2 data-[state=active]:bg-agro-green-light/20 data-[state=active]:text-agro-green-dark py-3">
              <Microscope className="w-5 h-5" />
              <span className="hidden sm:inline">Disease Detection</span>
              <span className="sm:hidden">Disease</span>
            </TabsTrigger>
            <TabsTrigger value="farmer-chat" className="flex gap-2 data-[state=active]:bg-agro-green-light/20 data-[state=active]:text-agro-green-dark py-3">
              <MessageSquare className="w-5 h-5" />
              <span className="hidden sm:inline">Farmer Chat</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="market-analysis" className="flex gap-2 data-[state=active]:bg-agro-green-light/20 data-[state=active]:text-agro-green-dark py-3">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Market Analysis</span>
              <span className="sm:hidden">Market</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="crop-suggestion" className="mt-0">
            <CropSuggestionTab crops={cropSuggestions} soilType={soilData?.type || ""} />
          </TabsContent>
          
          <TabsContent value="disease-detection" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Disease Detection</CardTitle>
                <CardDescription>
                  Upload an image of your crop to identify diseases and get treatment recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                  <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-agro-green-light/10 rounded-full text-agro-green-dark">
                    <Microscope className="w-8 h-8" />
                  </div>
                  <p className="mb-2 text-agro-brown-dark font-medium">Drag and drop an image here</p>
                  <p className="text-sm text-agro-brown-light mb-4">or click to browse files</p>
                  <Button className="bg-agro-green-dark hover:bg-agro-green-light text-white">
                    Upload Image
                  </Button>
                </div>
                <p className="text-center text-agro-brown-light">
                  You can also take a picture directly with your camera
                </p>
                <Button variant="outline" className="w-full">
                  Open Camera
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col items-center">
                <p className="text-sm text-agro-brown-light mb-2">
                  * This feature will analyze your crop image and identify diseases using AI
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="farmer-chat" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Farmer Community</CardTitle>
                <CardDescription>
                  Connect with local farmers, discuss farming practices, or rent tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-agro-yellow/20 rounded-full text-agro-brown-dark">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Connect with Local Farmers</h3>
                  <p className="mb-6 text-agro-brown-light">
                    Find farmers near {location?.name} to chat, share knowledge, or rent tools
                  </p>
                  <Button className="bg-agro-yellow text-agro-brown-dark hover:bg-agro-orange mb-4">
                    Find Nearby Farmers
                  </Button>
                  <p className="text-sm text-agro-brown-light mt-4">
                    6 farmers active in your area in the last 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="market-analysis" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Market Price Analysis</CardTitle>
                <CardDescription>
                  Compare current crop prices across wholesale markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-center text-agro-brown-dark mb-4">
                      Select a crop to see current market prices
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {cropSuggestions.slice(0, 4).map(crop => (
                        <Button 
                          key={crop.name}
                          variant="outline"
                          className="text-agro-brown-dark border-agro-green-light/30 flex flex-col h-auto py-3"
                        >
                          <span>{crop.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center py-4">
                    <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-agro-green-light/10 rounded-full text-agro-green-dark">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Select a crop to view price trends
                    </h3>
                    <p className="text-agro-brown-light mb-2">
                      Compare prices across different markets and find the best buyers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <ChatAssistant />
      <Footer />
    </div>
  );
};

export default LocationDetail;
