
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
    icon: "text-rose-300 dark:text-rose-400",
    gradient: "from-rose-500/20 via-slate-800/40 to-slate-900/60 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-blue-900/20",
    border: "border-rose-400/30 dark:border-slate-600/40",
    accent: "text-rose-300 dark:text-rose-400",
    glow: "shadow-rose-500/10"
  },
  blue: {
    icon: "text-blue-300 dark:text-cyan-400",
    gradient: "from-blue-500/20 via-slate-800/40 to-slate-900/60 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-blue-900/20",
    border: "border-blue-400/30 dark:border-slate-600/40",
    accent: "text-blue-300 dark:text-cyan-400",
    glow: "shadow-blue-500/10"
  },
  yellow: {
    icon: "text-amber-300 dark:text-yellow-400",
    gradient: "from-amber-500/20 via-slate-800/40 to-slate-900/60 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-amber-900/20",
    border: "border-amber-400/30 dark:border-slate-600/40",
    accent: "text-amber-300 dark:text-yellow-400",
    glow: "shadow-amber-500/10"
  },
  purple: {
    icon: "text-purple-300 dark:text-purple-400",
    gradient: "from-purple-500/20 via-slate-800/40 to-slate-900/60 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-purple-900/20",
    border: "border-purple-400/30 dark:border-slate-600/40",
    accent: "text-purple-300 dark:text-purple-400",
    glow: "shadow-purple-500/10"
  },
  green: {
    icon: "text-emerald-300 dark:text-emerald-400",
    gradient: "from-emerald-500/20 via-slate-800/40 to-slate-900/60 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-emerald-900/20",
    border: "border-emerald-400/30 dark:border-slate-600/40",
    accent: "text-emerald-300 dark:text-emerald-400",
    glow: "shadow-emerald-500/10"
  }
};

const statusColors = {
  normal: "bg-emerald-500 dark:bg-emerald-500/80 shadow-emerald-500/30",
  warning: "bg-amber-500 dark:bg-amber-500/80 shadow-amber-500/30",
  danger: "bg-red-500 dark:bg-red-500/80 shadow-red-500/30",
  low: "bg-orange-500 dark:bg-orange-500/80 shadow-orange-500/30",
  high: "bg-cyan-500 dark:bg-cyan-500/80 shadow-cyan-500/30"
};

const SensorCard = ({ icon: Icon, title, value, unit, status, isSimulated, color }: SensorCardProps) => {
  const colorClass = colorClasses[color];
  
  return (
    <Card className={`
      bg-gradient-to-br ${colorClass.gradient} 
      border ${colorClass.border} 
      hover:border-slate-400/50 dark:hover:border-slate-500/60 
      transition-all duration-300 
      hover:shadow-lg ${colorClass.glow} 
      backdrop-blur-sm
      dark:bg-gradient-to-br
    `}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center justify-between">
          <div className="flex items-center">
            <Icon className={`w-4 h-4 mr-2 ${colorClass.icon}`} />
            {title}
          </div>
          <div className="flex items-center space-x-2">
            {isSimulated && (
              <Badge variant="outline" className="text-xs text-amber-600 dark:text-yellow-400 border-amber-500/60 dark:border-yellow-400/40 bg-amber-100/80 dark:bg-yellow-400/10">
                SIM
              </Badge>
            )}
            <div className={`w-2 h-2 rounded-full ${statusColors[status]} shadow-sm`} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {value}
            <span className="text-lg text-slate-600 dark:text-slate-300 ml-1">{unit}</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`text-xs font-semibold bg-white/80 dark:bg-slate-800/60 ${
                status === 'normal' ? 'text-emerald-700 dark:text-emerald-400 border-emerald-500/60 dark:border-emerald-400/40' :
                status === 'warning' ? 'text-amber-700 dark:text-amber-400 border-amber-500/60 dark:border-amber-400/40' :
                status === 'danger' ? 'text-red-700 dark:text-red-400 border-red-500/60 dark:border-red-400/40' :
                status === 'low' ? 'text-orange-700 dark:text-orange-400 border-orange-500/60 dark:border-orange-400/40' :
                'text-cyan-700 dark:text-cyan-400 border-cyan-500/60 dark:border-cyan-400/40'
              }`}
            >
              {status.toUpperCase()}
            </Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
