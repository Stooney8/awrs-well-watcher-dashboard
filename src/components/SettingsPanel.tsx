
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Thermometer, 
  Droplets, 
  Wind, 
  BarChart3, 
  Leaf,
  RefreshCw,
  Download,
  Upload,
  Wifi,
  Shield
} from "lucide-react";

interface SettingsPanelProps {
  simulationSettings: {
    temperature: boolean;
    humidity: boolean;
    gasLevel: boolean;
    pressure: boolean;
    soilMoisture: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

const SettingsPanel = ({ simulationSettings, onSettingsChange }: SettingsPanelProps) => {
  const handleSimulationToggle = (sensor: string, enabled: boolean) => {
    onSettingsChange(prev => ({
      ...prev,
      [sensor]: enabled
    }));
  };

  const exportSettings = () => {
    const settings = {
      simulation: simulationSettings,
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    };
    console.log("Exporting settings:", settings);
  };

  const resetSettings = () => {
    onSettingsChange({
      temperature: true,
      humidity: true,
      gasLevel: true,
      pressure: true,
      soilMoisture: true
    });
  };

  const sensors = [
    { key: 'temperature', name: 'Temperature', icon: Thermometer, color: 'text-red-400' },
    { key: 'humidity', name: 'Humidity', icon: Droplets, color: 'text-blue-400' },
    { key: 'gasLevel', name: 'Gas Level', icon: Wind, color: 'text-yellow-400' },
    { key: 'pressure', name: 'Pressure', icon: BarChart3, color: 'text-purple-400' },
    { key: 'soilMoisture', name: 'Soil Moisture', icon: Leaf, color: 'text-green-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Simulation Settings */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-300">
            <Settings className="w-5 h-5 mr-2 text-cyan-400" />
            Sensor Simulation Settings
          </CardTitle>
          <p className="text-sm text-slate-400">
            Toggle simulation mode for individual sensors when hardware is unavailable
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {sensors.map(({ key, name, icon: Icon, color }) => (
            <div key={key} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg border border-slate-700">
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${color}`} />
                <div>
                  <p className="text-slate-300 font-medium">{name}</p>
                  <p className="text-xs text-slate-500">
                    {simulationSettings[key] ? 'Simulated data' : 'Hardware readings'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {simulationSettings[key] && (
                  <Badge variant="outline" className="text-orange-400 border-orange-400 text-xs">
                    SIM
                  </Badge>
                )}
                <Switch
                  checked={simulationSettings[key]}
                  onCheckedChange={(checked) => handleSimulationToggle(key, checked)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-300">
            <Shield className="w-5 h-5 mr-2 text-cyan-400" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300">Data Management</h4>
              <div className="space-y-2">
                <Button variant="outline" onClick={exportSettings} className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Settings
                </Button>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Settings
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300">System Control</h4>
              <div className="space-y-2">
                <Button variant="outline" onClick={resetSettings} className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Wifi className="w-4 h-4 mr-2" />
                  Network Settings
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-300">Device Information</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Model</p>
                <p className="text-slate-300 font-medium">Pi Zero W</p>
              </div>
              <div>
                <p className="text-slate-400">Firmware</p>
                <p className="text-slate-300 font-medium">v2.1.3</p>
              </div>
              <div>
                <p className="text-slate-400">IP Address</p>
                <p className="text-slate-300 font-medium">192.168.1.100</p>
              </div>
              <div>
                <p className="text-slate-400">MAC Address</p>
                <p className="text-slate-300 font-medium">AA:BB:CC:DD:EE:FF</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;
