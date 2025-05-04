
import { useState } from 'react';
import Header from '@/components/Header';
import MapSelector from '@/components/MapSelector';
import FeatureCard from '@/components/FeatureCard';
import ChatAssistant from '@/components/ChatAssistant';
import Footer from '@/components/Footer';
import { Calendar, Microscope, HandCoins, ShoppingBag, Tractor, Wheat } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    window.scrollTo({
      top: document.getElementById('features')?.offsetTop,
      behavior: 'smooth',
    });
  };

  const handleFeatureClick = (feature: string) => {
    console.log(`Selected feature: ${feature}`);
    // In a real application, this would navigate to the feature page
  };

  return (
    <div className="min-h-screen flex flex-col bg-agro-green-light/5">
      <Header />
      
      <main className="flex-grow container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-8 md:py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-agro-green-dark mb-4">
              Smart Farming Solutions
            </h1>
            <p className="text-xl text-agro-brown-dark mb-8">
              Make intelligent agricultural decisions with data-driven insights
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="agro-btn-primary">
                <span>Get Started</span>
                <Wheat className="w-5 h-5" />
              </button>
              <button className="agro-btn-secondary">
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-6">
          <MapSelector onLocationSelect={handleLocationSelect} />
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-8 md:py-12">
          {selectedLocation ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-agro-green-dark mb-2">
                  Services for {selectedLocation.name}
                </h2>
                <p className="text-agro-brown-light">
                  Select a service to get started
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <FeatureCard 
                  icon={<Wheat className="w-10 h-10" />}
                  title="Crop Suggestion"
                  description="Get personalized crop recommendations based on soil data and weather"
                  onClick={() => handleFeatureClick('crop-suggestion')}
                />
                <FeatureCard 
                  icon={<Microscope className="w-10 h-10" />}
                  title="Disease & Fertilizer"
                  description="Identify crop diseases and get treatment recommendations"
                  onClick={() => handleFeatureClick('disease-detection')}
                />
                <FeatureCard 
                  icon={<Tractor className="w-10 h-10" />}
                  title="Tool Renting"
                  description="Connect with local farmers to rent or share agricultural tools"
                  onClick={() => handleFeatureClick('tool-renting')}
                />
                <FeatureCard 
                  icon={<ShoppingBag className="w-10 h-10" />}
                  title="Market Analysis"
                  description="Compare crop prices across wholesale markets and connect with buyers"
                  onClick={() => handleFeatureClick('market-analysis')}
                />
              </div>
            </>
          ) : (
            <div className="text-center bg-white p-8 rounded-xl shadow-sm">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-agro-yellow/20 rounded-full text-agro-brown-dark animate-bounce-gentle">
                <MapSelector onLocationSelect={handleLocationSelect} /> 
              </div>
              <h2 className="text-2xl font-bold text-agro-brown-dark mb-3">
                Select Your Farm Location First
              </h2>
              <p className="text-agro-brown-light mb-6 max-w-lg mx-auto">
                Use the map above to select your farm location. This helps us provide personalized recommendations based on your specific conditions.
              </p>
            </div>
          )}
        </section>
        
        {/* Benefits Section */}
        <section className="py-8 md:py-12 bg-white rounded-2xl shadow-sm mt-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-agro-green-dark mb-2">
              Why Choose AgroVerse
            </h2>
            <p className="text-agro-brown-light max-w-2xl mx-auto">
              Our platform is designed specifically for farmers, with simplicity and ease of use in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-agro-green-light/10 rounded-full text-agro-green-dark">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-agro-brown-dark">Season-based Planning</h3>
              <p className="text-agro-brown-light">Get recommendations that align with seasonal changes and weather patterns</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-agro-yellow/10 rounded-full text-agro-orange">
                <HandCoins className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-agro-brown-dark">Profit Maximization</h3>
              <p className="text-agro-brown-light">Tools to help you increase yield and reduce costs through informed decisions</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-agro-brown-light/10 rounded-full text-agro-brown-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 18.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z"></path>
                  <path d="M12 22v-3"></path>
                  <path d="M12 5V2"></path>
                  <path d="m17 20.66-1-1.73"></path>
                  <path d="M7 3.34l1 1.73"></path>
                  <path d="m20.66 17-1.73-1"></path>
                  <path d="M3.34 7l1.73 1"></path>
                  <path d="M22 12h-3"></path>
                  <path d="M5 12H2"></path>
                  <path d="m20.66 7-1.73 1"></path>
                  <path d="M3.34 17l1.73-1"></path>
                  <path d="m17 3.34-1 1.73"></path>
                  <path d="m7 20.66 1-1.73"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-agro-brown-dark">Weather Integration</h3>
              <p className="text-agro-brown-light">Real-time weather data and forecasts to plan your farming activities</p>
            </div>
          </div>
        </section>
      </main>
      
      <ChatAssistant />
      <Footer />
    </div>
  );
};

export default Index;
