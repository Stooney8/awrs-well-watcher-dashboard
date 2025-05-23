
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Camera, 
  Play, 
  Pause, 
  RotateCw, 
  Download,
  Settings,
  Maximize,
  Volume2,
  VolumeX
} from "lucide-react";

interface CameraModuleProps {
  isStreaming: boolean;
  onToggleStream: (streaming: boolean) => void;
}

const CameraModule = ({ isStreaming, onToggleStream }: CameraModuleProps) => {
  const [quality, setQuality] = useState("HD");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleCapture = () => {
    console.log("Capturing image...");
    // In real implementation, this would trigger image capture via API
  };

  const handleRotate = () => {
    console.log("Rotating camera...");
    // In real implementation, this would control camera rotation
  };

  return (
    <div className="space-y-6">
      {/* Camera Controls */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-300">
            <Camera className="w-5 h-5 mr-2 text-cyan-400" />
            Camera Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => onToggleStream(!isStreaming)}
              className={`${
                isStreaming 
                  ? "bg-red-600 hover:bg-red-700 text-white" 
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isStreaming ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Stream
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Stream
                </>
              )}
            </Button>

            <Button variant="outline" onClick={handleCapture} className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Download className="w-4 h-4 mr-2" />
              Capture
            </Button>

            <Button variant="outline" onClick={handleRotate} className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <RotateCw className="w-4 h-4 mr-2" />
              Rotate
            </Button>

            <Button 
              variant="outline" 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Maximize className="w-4 h-4 mr-2" />
              Fullscreen
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Quality</label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="4K">4K (3840x2160)</SelectItem>
                  <SelectItem value="HD">HD (1920x1080)</SelectItem>
                  <SelectItem value="720p">720p (1280x720)</SelectItem>
                  <SelectItem value="480p">480p (854x480)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Frame Rate</label>
              <Select defaultValue="30">
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="60">60 FPS</SelectItem>
                  <SelectItem value="30">30 FPS</SelectItem>
                  <SelectItem value="15">15 FPS</SelectItem>
                  <SelectItem value="10">10 FPS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Audio</label>
              <Button
                variant="outline"
                onClick={() => setIsMuted(!isMuted)}
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 mr-2" />
                    Muted
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Audio On
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Camera Feed */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-slate-300">
            <div className="flex items-center">
              <Camera className="w-5 h-5 mr-2 text-cyan-400" />
              Live Feed
            </div>
            <div className="flex items-center space-x-2">
              {isStreaming && (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <Badge variant="outline" className="text-red-400 border-red-400">
                    LIVE
                  </Badge>
                </>
              )}
              <Badge variant="outline" className="text-slate-400 border-slate-600">
                {quality}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
            {isStreaming ? (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-cyan-400 font-semibold">Camera Feed Active</p>
                    <p className="text-sm text-slate-400">Streaming at {quality} quality</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div 
                        key={i}
                        className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Camera className="w-16 h-16 text-slate-600 mx-auto" />
                  <div>
                    <p className="text-slate-400 font-semibold">Camera Offline</p>
                    <p className="text-sm text-slate-500">Click "Start Stream" to begin</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CameraModule;
