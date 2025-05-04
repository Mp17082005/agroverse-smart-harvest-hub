
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SoilData } from '@/utils/soilService';

interface SoilInfoDisplayProps {
  soilData: SoilData;
}

const SoilInfoDisplay = ({ soilData }: SoilInfoDisplayProps) => {
  // Helper function to convert text levels to numeric values
  const getNutrientValue = (level: string): number => {
    switch (level.toLowerCase()) {
      case 'low': return 25;
      case 'medium': return 50;
      case 'high': return 90;
      default: return 0;
    }
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2 text-agro-soil">
            <path d="M8 18.023C5.042 17.121 3 14.354 3 11.023c0-3.866 3.134-7 7-7 1.172 0 2.311.29 3.332.838" />
            <path d="M22 15.032V7.01c-1.67-.1-3.295-.59-5.025-1.858-1.766 1.284-3.95 1.84-5.975 1.84h-1" />
            <path d="m22 15-10 7-6-4" />
            <path d="m14 12 8 3" />
          </svg>
          <span>Soil Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-medium">Type</h3>
            <span className="text-lg font-semibold text-agro-brown-dark">{soilData.type} Soil</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-medium">pH Level</h3>
              <span className="text-agro-brown-dark">{soilData.ph.toFixed(1)}</span>
            </div>
            <Progress 
              value={(soilData.ph - 4) * 10} 
              className="h-2 bg-gray-200"
            />
            <div className="flex justify-between text-xs text-agro-brown-light">
              <span>Acidic (4.0)</span>
              <span>Neutral (7.0)</span>
              <span>Alkaline (10.0)</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-medium">Nitrogen</h3>
                <span className="text-sm text-agro-brown-dark">{soilData.nitrogen}</span>
              </div>
              <Progress 
                value={getNutrientValue(soilData.nitrogen)} 
                className="h-2 bg-gray-200" 
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-medium">Phosphorus</h3>
                <span className="text-sm text-agro-brown-dark">{soilData.phosphorus}</span>
              </div>
              <Progress 
                value={getNutrientValue(soilData.phosphorus)} 
                className="h-2 bg-gray-200" 
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-medium">Potassium</h3>
                <span className="text-sm text-agro-brown-dark">{soilData.potassium}</span>
              </div>
              <Progress 
                value={getNutrientValue(soilData.potassium)} 
                className="h-2 bg-gray-200" 
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-medium">Organic Matter</h3>
                <span className="text-sm text-agro-brown-dark">{soilData.organicMatter}</span>
              </div>
              <Progress 
                value={getNutrientValue(soilData.organicMatter)} 
                className="h-2 bg-gray-200" 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilInfoDisplay;
