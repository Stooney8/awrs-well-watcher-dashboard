
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
    icon: "text-red-400",
    gradient: "from-red-500/20 to-red-600/5",
    border: "border-red-500/30"
  },
  blue: {
    icon: "text-blue-400",
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30"
  },
  yellow: {
    icon: "text-yellow-400",
    gradient: "from-yellow-500/20 to-yellow-600/5",
    border: "border-yellow-500/30"
  },
  purple: {
    icon: "text-purple-400",
    gradient: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/30"
  },
  green: {
    icon: "text-green-400",
    gradient: "from-green-500/20 to-green-600/5",
    border: "border-green-500/30"
  }
};

const statusColors = {
  normal: "bg-green-500",
  warning: "bg-yellow-500",
  danger: "bg-red-500",
  low: "bg-orange-500",
  high: "bg-blue-500"
};

const SensorCard = ({ icon: Icon, title, value, unit, status, isSimulated, color }: SensorCardProps) => {
  const colorClass = colorClasses[color];
  
  return (
    <Card className={`bg-gradient-to-br ${colorClass.gradient} border-slate-700 ${colorClass.border} hover:border-opacity-60 transition-all duration-300 hover:shadow-lg hover:shadow-${color}-500/10`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-300 flex items-center justify-between">
          <div className="flex items-center">
            <Icon className={`w-4 h-4 mr-2 ${colorClass.icon}`} />
            {title}
          </div>
          <div className="flex items-center space-x-2">
            {isSimulated && (
              <Badge variant="outline" className="text-xs text-orange-400 border-orange-400">
                SIM
              </Badge>
            )}
            <div className={`w-2 h-2 rounded-full ${statusColors[status]} animate-pulse`} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white">
            {value}
            <span className="text-lg text-slate-400 ml-1">{unit}</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`text-xs ${
                status === 'normal' ? 'text-green-400 border-green-400' :
                status === 'warning' ? 'text-yellow-400 border-yellow-400' :
                status === 'danger' ? 'text-red-400 border-red-400' :
                status === 'low' ? 'text-orange-400 border-orange-400' :
                'text-blue-400 border-blue-400'
              }`}
            >
              {status.toUpperCase()}
            </Badge>
            <span className="text-xs text-slate-500">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
