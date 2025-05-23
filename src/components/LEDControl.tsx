
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Power } from "lucide-react";

const LEDControl = () => {
  const [isLEDOn, setIsLEDOn] = useState(false);

  const handleToggleLED = () => {
    setIsLEDOn(!isLEDOn);
    console.log(`LED ${!isLEDOn ? 'ON' : 'OFF'}`);
    // In real implementation, this would send GPIO command to Pi Zero
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-300 flex items-center">
          <Lightbulb className={`w-4 h-4 mr-2 ${isLEDOn ? 'text-yellow-400' : 'text-slate-500'}`} />
          LED Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={handleToggleLED}
          className={`w-full ${
            isLEDOn 
              ? "bg-yellow-600 hover:bg-yellow-700 text-black" 
              : "bg-slate-700 hover:bg-slate-600 text-white"
          }`}
        >
          <Power className="w-4 h-4 mr-2" />
          {isLEDOn ? "Turn OFF" : "Turn ON"}
        </Button>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Status:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLEDOn ? 'bg-yellow-400 animate-pulse' : 'bg-slate-600'}`} />
            <span className="text-xs text-slate-300">
              {isLEDOn ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LEDControl;
