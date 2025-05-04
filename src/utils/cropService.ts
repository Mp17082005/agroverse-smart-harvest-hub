
import { SoilData } from './soilService';

export interface CropSuggestion {
  name: string;
  growthDays: number;
  expectedYield: string; // Per acre
  confidence: number; // 0-100
  description: string;
  waterRequirement: string; // Low, Medium, High
  temperature: {
    min: number;
    max: number;
  };
  profitPotential: string; // Low, Medium, High
  idealSoilTypes: string[];
  season: string; // Kharif, Rabi, Zaid
  imageUrl: string;
}

// Database of crops with their requirements
const cropDatabase: CropSuggestion[] = [
  {
    name: "Wheat",
    growthDays: 120,
    expectedYield: "15-20 quintal",
    confidence: 90,
    description: "A staple grain crop best grown in cooler seasons",
    waterRequirement: "Medium",
    temperature: { min: 10, max: 24 },
    profitPotential: "Medium",
    idealSoilTypes: ["Loamy", "Clay Loam", "Silty"],
    season: "Rabi",
    imageUrl: "https://source.unsplash.com/featured/?wheat"
  },
  {
    name: "Rice",
    growthDays: 130,
    expectedYield: "25-30 quintal",
    confidence: 95,
    description: "Staple food crop grown in waterlogged conditions",
    waterRequirement: "High",
    temperature: { min: 22, max: 35 },
    profitPotential: "Medium",
    idealSoilTypes: ["Clay", "Heavy Soil", "Alluvial"],
    season: "Kharif",
    imageUrl: "https://source.unsplash.com/featured/?rice"
  },
  {
    name: "Cotton",
    growthDays: 160,
    expectedYield: "10-15 quintal",
    confidence: 80,
    description: "Cash crop used for textile production",
    waterRequirement: "Medium",
    temperature: { min: 20, max: 35 },
    profitPotential: "High",
    idealSoilTypes: ["Black", "Deep Soil", "Alluvial"],
    season: "Kharif",
    imageUrl: "https://source.unsplash.com/featured/?cotton"
  },
  {
    name: "Sugarcane",
    growthDays: 365,
    expectedYield: "400-500 quintal",
    confidence: 85,
    description: "Perennial crop used for sugar production",
    waterRequirement: "High",
    temperature: { min: 20, max: 35 },
    profitPotential: "High",
    idealSoilTypes: ["Loamy", "Clay Loam", "Alluvial"],
    season: "Year-round",
    imageUrl: "https://source.unsplash.com/featured/?sugarcane"
  },
  {
    name: "Maize",
    growthDays: 100,
    expectedYield: "20-25 quintal",
    confidence: 88,
    description: "Versatile crop used for food, feed, and industry",
    waterRequirement: "Medium",
    temperature: { min: 18, max: 32 },
    profitPotential: "Medium",
    idealSoilTypes: ["Sandy Loam", "Loamy", "Alluvial"],
    season: "Kharif",
    imageUrl: "https://source.unsplash.com/featured/?maize"
  },
  {
    name: "Groundnut",
    growthDays: 120,
    expectedYield: "10-15 quintal",
    confidence: 82,
    description: "Legume crop that enriches soil with nitrogen",
    waterRequirement: "Low",
    temperature: { min: 20, max: 30 },
    profitPotential: "High",
    idealSoilTypes: ["Sandy Loam", "Red", "Light Soil"],
    season: "Kharif",
    imageUrl: "https://source.unsplash.com/featured/?groundnut"
  },
  {
    name: "Tomato",
    growthDays: 90,
    expectedYield: "200-300 quintal",
    confidence: 75,
    description: "Popular vegetable crop with high market demand",
    waterRequirement: "Medium",
    temperature: { min: 15, max: 30 },
    profitPotential: "High",
    idealSoilTypes: ["Loamy", "Sandy Loam", "Rich in organic matter"],
    season: "Year-round",
    imageUrl: "https://source.unsplash.com/featured/?tomato"
  },
  {
    name: "Mustard",
    growthDays: 110,
    expectedYield: "8-12 quintal",
    confidence: 70,
    description: "Oil seed crop suited for cooler conditions",
    waterRequirement: "Low",
    temperature: { min: 10, max: 25 },
    profitPotential: "Medium",
    idealSoilTypes: ["Loamy", "Clay Loam", "Well-drained"],
    season: "Rabi",
    imageUrl: "https://source.unsplash.com/featured/?mustard"
  }
];

// Function to suggest crops based on soil data and weather conditions
export const getCropSuggestions = (
  soilData: SoilData, 
  temperature: number, 
  humidity: number, 
  season: string = getCurrentSeason()
): CropSuggestion[] => {
  
  // Simple algorithm to match crops to conditions
  // In a real application, this would be more sophisticated
  
  const matchedCrops = cropDatabase
    .map(crop => {
      // Calculate match score (0-100)
      let score = 0;
      
      // Soil type match
      if (crop.idealSoilTypes.some(type => type.toLowerCase().includes(soilData.type.toLowerCase()))) {
        score += 25;
      }
      
      // Temperature match
      if (temperature >= crop.temperature.min && temperature <= crop.temperature.max) {
        score += 25;
      } else if (
        temperature >= crop.temperature.min - 5 && 
        temperature <= crop.temperature.max + 5
      ) {
        score += 10;
      }
      
      // Water requirement based on humidity
      const waterRequirementMatch = {
        "Low": humidity < 50,
        "Medium": humidity >= 40 && humidity <= 70,
        "High": humidity > 60
      };
      
      if (waterRequirementMatch[crop.waterRequirement as keyof typeof waterRequirementMatch]) {
        score += 20;
      }
      
      // Season match
      if (crop.season === season || crop.season === "Year-round") {
        score += 30;
      }
      
      // Return crop with adjusted confidence
      return {
        ...crop,
        confidence: Math.min(Math.round(score), 100)
      };
    })
    .filter(crop => crop.confidence > 40) // Only return crops with reasonable confidence
    .sort((a, b) => b.confidence - a.confidence); // Sort by confidence
  
  return matchedCrops.slice(0, 5); // Return top 5 matches
};

// Helper function to determine current growing season based on month
const getCurrentSeason = (): string => {
  const month = new Date().getMonth(); // 0-11
  
  // Indian agricultural seasons:
  // Kharif: June to October (monsoon crops)
  // Rabi: November to March (winter crops)
  // Zaid: April to June (summer crops)
  
  if (month >= 5 && month <= 9) return "Kharif";
  if (month >= 10 || month <= 2) return "Rabi";
  return "Zaid";
};

// Function to get suggested crops for a location
export const getSuggestedCropsForLocation = async (
  lat: number, 
  lng: number, 
  temperature: number, 
  humidity: number
): Promise<CropSuggestion[]> => {
  try {
    // In a real app, this would fetch soil data from an API
    const soilData = await import('./soilService').then(module => module.fetchSoilData(lat, lng));
    
    // Get crop suggestions based on soil and weather data
    return getCropSuggestions(soilData, temperature, humidity);
  } catch (error) {
    console.error("Error getting crop suggestions:", error);
    return [];
  }
};
