
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  unit: string;
  status: "normal" | "warning" | "danger" | "low" | "high";
  isSimulated: boolean;
  color: "red" | "blue" | "yellow" | "purple" | "green";
}

const colorClasses = {
  red: {
    icon: "text-slate-300",
    gradient: "from-slate-800/40 to-slate-700/20",
    border: "border-slate-600/30",
    accent: "text-red-300"
  },
  blue: {
    icon: "text-slate-300",
    gradient: "from-slate-800/40 to-slate-700/20",
    border: "border-slate-600/30",
    accent: "text-blue-300"
  },
  yellow: {
    icon: "text-slate-300",
    gradient: "from-slate-800/40 to-slate-700/20",
    border: "border-slate-600/30",
    accent: "text-yellow-300"
  },
  purple: {
    icon: "text-slate-300",
    gradient: "from-slate-800/40 to-slate-700/20",
    border: "border-slate-600/30",
    accent: "text-purple-300"
  },
  green: {
    icon: "text-slate-300",
    gradient: "from-slate-800/40 to-slate-700/20",
    border: "border-slate-600/30",
    accent: "text-green-300"
  }
};

const statusColors = {
  normal: "bg-green-500/80",
  warning: "bg-yellow-500/80",
  danger: "bg-red-500/80",
  low: "bg-orange-500/80",
  high: "bg-blue-500/80"
};

const SensorCard = ({ icon: Icon, title, value, unit, status, isSimulated, color }: SensorCardProps) => {
  const colorClass = colorClasses[color];
  
  return (
    <Card className={`bg-gradient-to-br ${colorClass.gradient} border ${colorClass.border} hover:border-slate-500/50 transition-all duration-300 hover:shadow-md backdrop-blur-sm`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-200 flex items-center justify-between">
          <div className="flex items-center">
            <Icon className={`w-4 h-4 mr-2 ${colorClass.icon}`} />
            {title}
          </div>
          <div className="flex items-center space-x-2">
            {isSimulated && (
              <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400/40 bg-yellow-400/10">
                SIM
              </Badge>
            )}
            <div className={`w-2 h-2 rounded-full ${statusColors[status]} shadow-sm`} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white">
            {value}
            <span className="text-lg text-slate-300 ml-1">{unit}</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`text-xs bg-slate-800/50 ${
                status === 'normal' ? 'text-green-400 border-green-400/40' :
                status === 'warning' ? 'text-yellow-400 border-yellow-400/40' :
                status === 'danger' ? 'text-red-400 border-red-400/40' :
                status === 'low' ? 'text-orange-400 border-orange-400/40' :
                'text-blue-400 border-blue-400/40'
              }`}
            >
              {status.toUpperCase()}
            </Badge>
            <span className="text-xs text-slate-400">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
