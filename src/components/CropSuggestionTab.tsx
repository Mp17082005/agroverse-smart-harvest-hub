
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CropSuggestion } from '@/utils/cropService';

interface CropSuggestionTabProps {
  crops: CropSuggestion[];
  soilType: string;
}

const CropSuggestionTab = ({ crops, soilType }: CropSuggestionTabProps) => {
  return (
    <div className="space-y-6">
      {crops.length > 0 ? (
        <>
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-2">Recommendations for {soilType} Soil</h2>
            <p className="text-agro-brown-light">
              Based on your soil type, current season, and weather conditions, we recommend the following crops:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crops.map((crop, index) => (
              <Card key={index} className={`bg-white overflow-hidden h-full ${index === 0 ? 'md:col-span-2 shadow-md border-agro-green-light' : 'shadow-sm'}`}>
                <div className="flex flex-col h-full">
                  {index === 0 && (
                    <div className="bg-agro-green-light text-white text-center py-1 text-sm font-medium">
                      Top Recommendation
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row h-full">
                    <div 
                      className="bg-cover bg-center w-full md:w-1/3 h-48 md:h-auto"
                      style={{ backgroundImage: `url(${crop.imageUrl})` }}
                    ></div>
                    <div className="flex-1">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{crop.name}</span>
                          <span className="text-sm bg-agro-green-light/10 text-agro-green-dark px-2 py-1 rounded">
                            {crop.season} Season
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-4">
                          <p className="text-agro-brown-light">{crop.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-agro-brown-light">Growth Period</p>
                              <p className="font-medium">{crop.growthDays} days</p>
                            </div>
                            <div>
                              <p className="text-sm text-agro-brown-light">Expected Yield</p>
                              <p className="font-medium">{crop.expectedYield}</p>
                            </div>
                            <div>
                              <p className="text-sm text-agro-brown-light">Water Requirement</p>
                              <p className="font-medium">{crop.waterRequirement}</p>
                            </div>
                            <div>
                              <p className="text-sm text-agro-brown-light">Profit Potential</p>
                              <p className="font-medium">{crop.profitPotential}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Suitability Score</span>
                              <span className="text-sm font-medium">{crop.confidence}%</span>
                            </div>
                            <Progress 
                              value={crop.confidence} 
                              className="h-2" 
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex space-x-4">
                          <button className="text-sm font-medium text-agro-green-dark hover:text-agro-green-light">
                            View Planting Guide
                          </button>
                          <button className="text-sm font-medium text-agro-green-dark hover:text-agro-green-light">
                            Market Outlook
                          </button>
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-agro-yellow/20 rounded-full text-agro-brown-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.16-6.2L12 3.23" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-agro-brown-dark">No Crop Recommendations Available</h2>
          <p className="text-agro-brown-light max-w-md mx-auto">
            We couldn't generate crop recommendations for this location. This might be due to insufficient soil or weather data.
          </p>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Crop Calendar</h3>
        <div className="bg-white rounded-xl p-4 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-2"></div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Jan</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Feb</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Mar</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Apr</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">May</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Jun</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Jul</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Aug</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Sep</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Oct</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Nov</div>
              <div className="col-span-1 text-center text-xs font-medium text-agro-brown-light">Dec</div>
            </div>
            
            {crops.slice(0, 5).map((crop, index) => (
              <div key={index} className="grid grid-cols-12 gap-1 mt-2">
                <div className="col-span-2 flex items-center">
                  <span className="text-sm font-medium truncate">{crop.name}</span>
                </div>
                {renderCropCalendar(crop)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to render crop calendar based on season
const renderCropCalendar = (crop: CropSuggestion) => {
  const months = Array(12).fill(0);
  
  // Based on season and growth days, highlight the appropriate months
  if (crop.season === "Kharif") { // June-October
    const startMonth = 5; // June (0-indexed)
    const duration = Math.ceil(crop.growthDays / 30);
    
    for (let i = 0; i < duration && i + startMonth < 12; i++) {
      months[i + startMonth] = i === 0 ? 1 : (i === duration - 1 ? 3 : 2);
    }
  } else if (crop.season === "Rabi") { // November-March
    const startMonth = 10; // November (0-indexed)
    const duration = Math.ceil(crop.growthDays / 30);
    
    for (let i = 0; i < duration; i++) {
      const month = (i + startMonth) % 12;
      months[month] = i === 0 ? 1 : (i === duration - 1 ? 3 : 2);
    }
  } else if (crop.season === "Zaid") { // April-June
    const startMonth = 3; // April (0-indexed)
    const duration = Math.ceil(crop.growthDays / 30);
    
    for (let i = 0; i < duration && i + startMonth < 12; i++) {
      months[i + startMonth] = i === 0 ? 1 : (i === duration - 1 ? 3 : 2);
    }
  } else { // Year-round, just show an example
    const startMonth = new Date().getMonth();
    const duration = Math.min(Math.ceil(crop.growthDays / 30), 6);
    
    for (let i = 0; i < duration; i++) {
      const month = (i + startMonth) % 12;
      months[month] = i === 0 ? 1 : (i === duration - 1 ? 3 : 2);
    }
  }
  
  return months.map((status, index) => {
    let bgColor = 'bg-gray-100';
    let tooltip = '';
    
    if (status === 1) {
      bgColor = 'bg-agro-green-light/30';
      tooltip = 'Sowing';
    } else if (status === 2) {
      bgColor = 'bg-agro-green-light/60';
      tooltip = 'Growing';
    } else if (status === 3) {
      bgColor = 'bg-agro-green-light';
      tooltip = 'Harvest';
    }
    
    return (
      <div key={index} className="col-span-1 h-8 flex items-center justify-center">
        <div 
          className={`w-full h-full rounded ${bgColor}`}
          title={tooltip ? `${crop.name}: ${tooltip}` : ''}
        ></div>
      </div>
    );
  });
};

export default CropSuggestionTab;
