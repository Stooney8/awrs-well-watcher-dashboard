
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
    icon: "text-rose-300",
    gradient: "from-rose-500/10 to-rose-600/5",
    border: "border-rose-400/20"
  },
  blue: {
    icon: "text-sky-300",
    gradient: "from-sky-500/10 to-sky-600/5",
    border: "border-sky-400/20"
  },
  yellow: {
    icon: "text-amber-300",
    gradient: "from-amber-500/10 to-amber-600/5",
    border: "border-amber-400/20"
  },
  purple: {
    icon: "text-violet-300",
    gradient: "from-violet-500/10 to-violet-600/5",
    border: "border-violet-400/20"
  },
  green: {
    icon: "text-emerald-300",
    gradient: "from-emerald-500/10 to-emerald-600/5",
    border: "border-emerald-400/20"
  }
};

const statusColors = {
  normal: "bg-emerald-400",
  warning: "bg-amber-400",
  danger: "bg-rose-400",
  low: "bg-orange-400",
  high: "bg-blue-400"
};

const SensorCard = ({ icon: Icon, title, value, unit, status, isSimulated, color }: SensorCardProps) => {
  const colorClass = colorClasses[color];
  
  return (
    <Card className={`bg-gradient-to-br ${colorClass.gradient} border-slate-700 ${colorClass.border} hover:border-opacity-40 transition-all duration-300 hover:shadow-lg`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-200 flex items-center justify-between">
          <div className="flex items-center">
            <Icon className={`w-4 h-4 mr-2 ${colorClass.icon}`} />
            {title}
          </div>
          <div className="flex items-center space-x-2">
            {isSimulated && (
              <Badge variant="outline" className="text-xs text-amber-300 border-amber-300/50">
                SIM
              </Badge>
            )}
            <div className={`w-2 h-2 rounded-full ${statusColors[status]} animate-pulse`} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-slate-100">
            {value}
            <span className="text-lg text-slate-300 ml-1">{unit}</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`text-xs ${
                status === 'normal' ? 'text-emerald-300 border-emerald-300/50' :
                status === 'warning' ? 'text-amber-300 border-amber-300/50' :
                status === 'danger' ? 'text-rose-300 border-rose-300/50' :
                status === 'low' ? 'text-orange-300 border-orange-300/50' :
                'text-blue-300 border-blue-300/50'
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
