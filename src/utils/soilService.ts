
export interface SoilData {
  type: string;
  ph: number;
  nitrogen: string; // Low, Medium, High
  phosphorus: string; // Low, Medium, High
  potassium: string; // Low, Medium, High
  organicMatter: string; // Low, Medium, High
}

// Mock soil data service (replace with actual API in production)
export const fetchSoilData = async (lat: number, lng: number): Promise<SoilData> => {
  console.log(`Fetching soil data for coordinates: ${lat}, ${lng}`);
  
  // This would be replaced with actual API call to soil data service
  
  // Deterministically generate soil data based on coordinates
  const soilTypes = ["Clay", "Sandy", "Loamy", "Silty", "Black", "Red", "Alluvial"];
  const soilTypeIndex = Math.abs(Math.floor((lat * lng) % soilTypes.length));
  
  const mockSoilData: SoilData = {
    type: soilTypes[soilTypeIndex],
    ph: 5.5 + (Math.abs(Math.sin(lat + lng)) * 3), // pH between 5.5 and 8.5
    nitrogen: ["Low", "Medium", "High"][Math.floor((Math.sin(lat) + 1) * 1.5)],
    phosphorus: ["Low", "Medium", "High"][Math.floor((Math.cos(lng) + 1) * 1.5)],
    potassium: ["Low", "Medium", "High"][Math.floor((Math.sin(lat + lng) + 1) * 1.5)],
    organicMatter: ["Low", "Medium", "High"][Math.floor((Math.cos(lat - lng) + 1) * 1.5)]
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return mockSoilData;
};
