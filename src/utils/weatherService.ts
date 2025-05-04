
interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
}

// Mock weather data (replace with actual API call later)
export const fetchWeatherData = async (lat: number, lng: number): Promise<WeatherData> => {
  console.log(`Fetching weather data for coordinates: ${lat}, ${lng}`);
  
  // This would be replaced with actual API call to OpenWeatherMap or similar
  // Example: const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`);
  
  // For now, return mock data based on coordinates to simulate different weather conditions
  const mockWeatherData: WeatherData = {
    location: `Farm at ${lat.toFixed(2)}, ${lng.toFixed(2)}`,
    temperature: 25 + (Math.sin(lat) * 5), // Simulate temperature variation
    humidity: 60 + (Math.cos(lng) * 10), // Simulate humidity variation
    description: ["Clear sky", "Partly cloudy", "Light rain", "Sunny"][Math.floor(Math.random() * 4)],
    icon: ["01d", "02d", "10d", "01d"][Math.floor(Math.random() * 4)],
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockWeatherData;
};

// Get appropriate weather icon URL
export const getWeatherIconUrl = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
