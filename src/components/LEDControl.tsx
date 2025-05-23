
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
    <Card className="
      bg-white dark:bg-slate-800/90
      border border-slate-200 dark:border-slate-700
      hover:border-slate-300 dark:hover:border-slate-600
      transition-all duration-300 
      hover:shadow-lg hover:shadow-slate-200/20 dark:hover:shadow-slate-900/40
    ">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
          <Lightbulb className={`w-4 h-4 mr-2 ${isLEDOn ? 'text-yellow-500' : 'text-slate-500 dark:text-slate-400'}`} />
          LED Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={handleToggleLED}
          className={`w-full transition-all duration-200 ${
            isLEDOn 
              ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-200/50 dark:shadow-yellow-500/30" 
              : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
          }`}
        >
          <Power className="w-4 h-4 mr-2" />
          {isLEDOn ? "Turn OFF" : "Turn ON"}
        </Button>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">Status:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full transition-all duration-200 ${isLEDOn ? 'bg-yellow-500 shadow-yellow-200/50 dark:shadow-yellow-500/30' : 'bg-slate-400 dark:bg-slate-600'}`} />
            <span className="text-xs text-slate-700 dark:text-slate-300">
              {isLEDOn ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LEDControl;
