
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Battery, Zap, Clock } from "lucide-react";

const BatteryStatus = () => {
  const [batteryData, setBatteryData] = useState({
    level: 78,
    voltage: 3.7,
    current: -145, // negative = discharging
    timeRemaining: "4h 23m",
    status: "discharging"
  });

  // Simulate battery drain
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryData(prev => ({
        ...prev,
        level: Math.max(0, prev.level - 0.1),
        voltage: 3.3 + (prev.level / 100) * 0.8,
        current: -120 - Math.random() * 50
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-green-400";
    if (level > 20) return "text-yellow-400";
    return "text-red-400";
  };

  const getBatteryIcon = (level: number) => {
    if (level > 75) return "🔋";
    if (level > 50) return "🔋";
    if (level > 25) return "🪫";
    return "🪫";
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-300 flex items-center">
          <Battery className={`w-4 h-4 mr-2 ${getBatteryColor(batteryData.level)}`} />
          Battery Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">
              {batteryData.level.toFixed(0)}%
            </span>
            <span className="text-lg">{getBatteryIcon(batteryData.level)}</span>
          </div>
          
          <Progress 
            value={batteryData.level} 
            className="h-2 bg-slate-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <div className="flex items-center text-slate-400">
              <Zap className="w-3 h-3 mr-1" />
              Voltage
            </div>
            <div className="text-slate-300 font-medium">
              {batteryData.voltage.toFixed(2)}V
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center text-slate-400">
              <Clock className="w-3 h-3 mr-1" />
              Remaining
            </div>
            <div className="text-slate-300 font-medium">
              {batteryData.timeRemaining}
            </div>
          </div>
        </div>

        <Badge 
          variant="outline" 
          className={`w-full justify-center ${
            batteryData.status === 'charging' 
              ? 'text-green-400 border-green-400' 
              : 'text-orange-400 border-orange-400'
          }`}
        >
          {batteryData.status === 'charging' ? 'Charging' : 'Discharging'}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default BatteryStatus;
