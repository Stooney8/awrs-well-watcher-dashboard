
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  BarChart3, 
  Leaf, 
  Camera, 
  Lightbulb,
  Battery,
  Settings,
  Wifi,
  WifiOff,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import SensorCard from "@/components/SensorCard";
import CameraModule from "@/components/CameraModule";
import LEDControl from "@/components/LEDControl";
import BatteryStatus from "@/components/BatteryStatus";
import SettingsPanel from "@/components/SettingsPanel";

const Index = () => {
  const [sensorData, setSensorData] = useState({
    temperature: { value: 22.5, unit: "°C", status: "normal" },
    humidity: { value: 65, unit: "%", status: "normal" },
    gasLevel: { value: 45, unit: "ppm", status: "normal" },
    pressure: { value: 1013.25, unit: "hPa", status: "normal" },
    soilMoisture: { value: 35, unit: "%", status: "low" }
  });

  const [simulationSettings, setSimulationSettings] = useState({
    temperature: true,
    humidity: true,
    gasLevel: true,
    pressure: true,
    soilMoisture: true
  });

  const [systemStatus, setSystemStatus] = useState({
    connected: true,
    lastUpdate: new Date(),
    uptime: "2h 35m"
  });

  const [cameraStatus, setCameraStatus] = useState({
    isStreaming: false,
    quality: "HD",
    fps: 30
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: {
          ...prev.temperature,
          value: simulationSettings.temperature ? 
            20 + Math.random() * 10 + Math.sin(Date.now() / 10000) * 3 : 
            prev.temperature.value
        },
        humidity: {
          ...prev.humidity,
          value: simulationSettings.humidity ? 
            60 + Math.random() * 20 + Math.cos(Date.now() / 8000) * 5 : 
            prev.humidity.value
        },
        gasLevel: {
          ...prev.gasLevel,
          value: simulationSettings.gasLevel ? 
            Math.max(0, 40 + Math.random() * 30 + Math.sin(Date.now() / 15000) * 10) : 
            prev.gasLevel.value,
          status: prev.gasLevel.value > 80 ? "danger" : prev.gasLevel.value > 60 ? "warning" : "normal"
        },
        pressure: {
          ...prev.pressure,
          value: simulationSettings.pressure ? 
            1010 + Math.random() * 8 + Math.sin(Date.now() / 20000) * 2 : 
            prev.pressure.value
        },
        soilMoisture: {
          ...prev.soilMoisture,
          value: simulationSettings.soilMoisture ? 
            30 + Math.random() * 40 + Math.cos(Date.now() / 12000) * 10 : 
            prev.soilMoisture.value,
          status: prev.soilMoisture.value < 30 ? "low" : prev.soilMoisture.value > 70 ? "high" : "normal"
        }
      }));

      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: new Date()
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [simulationSettings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AWRS Dashboard
                </h1>
                <p className="text-sm text-slate-400">Automated Well Reconnaissance System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {systemStatus.connected ? (
                  <Wifi className="w-4 h-4 text-green-400" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-400" />
                )}
                <span className="text-sm text-slate-400">
                  {systemStatus.connected ? "Connected" : "Offline"}
                </span>
              </div>
              <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                Uptime: {systemStatus.uptime}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-700">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="camera" className="data-[state=active]:bg-slate-700">
              Camera
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Status Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <BatteryStatus />
              <LEDControl />
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-300 flex items-center">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Last Update
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-cyan-400">
                    {systemStatus.lastUpdate.toLocaleTimeString()}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {systemStatus.lastUpdate.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-300 flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    Camera Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    {cameraStatus.isStreaming ? (
                      <Play className="w-4 h-4 text-green-400" />
                    ) : (
                      <Pause className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-sm text-slate-300">
                      {cameraStatus.isStreaming ? "Streaming" : "Stopped"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {cameraStatus.quality} • {cameraStatus.fps} FPS
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sensor Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SensorCard
                icon={Thermometer}
                title="Temperature"
                value={sensorData.temperature.value.toFixed(1)}
                unit={sensorData.temperature.unit}
                status={sensorData.temperature.status}
                isSimulated={simulationSettings.temperature}
                color="red"
              />
              
              <SensorCard
                icon={Droplets}
                title="Humidity"
                value={sensorData.humidity.value.toFixed(0)}
                unit={sensorData.humidity.unit}
                status={sensorData.humidity.status}
                isSimulated={simulationSettings.humidity}
                color="blue"
              />
              
              <SensorCard
                icon={Wind}
                title="Gas Level"
                value={sensorData.gasLevel.value.toFixed(0)}
                unit={sensorData.gasLevel.unit}
                status={sensorData.gasLevel.status}
                isSimulated={simulationSettings.gasLevel}
                color="yellow"
              />
              
              <SensorCard
                icon={BarChart3}
                title="Pressure"
                value={sensorData.pressure.value.toFixed(1)}
                unit={sensorData.pressure.unit}
                status={sensorData.pressure.status}
                isSimulated={simulationSettings.pressure}
                color="purple"
              />
              
              <SensorCard
                icon={Leaf}
                title="Soil Moisture"
                value={sensorData.soilMoisture.value.toFixed(0)}
                unit={sensorData.soilMoisture.unit}
                status={sensorData.soilMoisture.status}
                isSimulated={simulationSettings.soilMoisture}
                color="green"
              />
            </div>
          </TabsContent>

          <TabsContent value="camera">
            <CameraModule 
              isStreaming={cameraStatus.isStreaming}
              onToggleStream={(streaming) => setCameraStatus(prev => ({...prev, isStreaming: streaming}))}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel 
              simulationSettings={simulationSettings}
              onSettingsChange={setSimulationSettings}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
