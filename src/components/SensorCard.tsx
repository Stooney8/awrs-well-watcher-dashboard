
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
    icon: "text-rose-600 dark:text-rose-400",
    gradient: "from-white via-rose-50/50 to-rose-100/30 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-rose-900/20",
    border: "border-rose-200 dark:border-slate-600/40",
    accent: "text-rose-600 dark:text-rose-400",
    glow: "shadow-rose-200/20 dark:shadow-rose-500/10"
  },
  blue: {
    icon: "text-blue-600 dark:text-cyan-400",
    gradient: "from-white via-blue-50/50 to-blue-100/30 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-blue-900/20",
    border: "border-blue-200 dark:border-slate-600/40",
    accent: "text-blue-600 dark:text-cyan-400",
    glow: "shadow-blue-200/20 dark:shadow-blue-500/10"
  },
  yellow: {
    icon: "text-amber-600 dark:text-yellow-400",
    gradient: "from-white via-amber-50/50 to-amber-100/30 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-amber-900/20",
    border: "border-amber-200 dark:border-slate-600/40",
    accent: "text-amber-600 dark:text-yellow-400",
    glow: "shadow-amber-200/20 dark:shadow-amber-500/10"
  },
  purple: {
    icon: "text-purple-600 dark:text-purple-400",
    gradient: "from-white via-purple-50/50 to-purple-100/30 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-purple-900/20",
    border: "border-purple-200 dark:border-slate-600/40",
    accent: "text-purple-600 dark:text-purple-400",
    glow: "shadow-purple-200/20 dark:shadow-purple-500/10"
  },
  green: {
    icon: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-white via-emerald-50/50 to-emerald-100/30 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-emerald-900/20",
    border: "border-emerald-200 dark:border-slate-600/40",
    accent: "text-emerald-600 dark:text-emerald-400",
    glow: "shadow-emerald-200/20 dark:shadow-emerald-500/10"
  }
};

const statusColors = {
  normal: "bg-emerald-500 dark:bg-emerald-500/80 shadow-emerald-200/50 dark:shadow-emerald-500/30",
  warning: "bg-amber-500 dark:bg-amber-500/80 shadow-amber-200/50 dark:shadow-amber-500/30",
  danger: "bg-red-500 dark:bg-red-500/80 shadow-red-200/50 dark:shadow-red-500/30",
  low: "bg-orange-500 dark:bg-orange-500/80 shadow-orange-200/50 dark:shadow-orange-500/30",
  high: "bg-cyan-500 dark:bg-cyan-500/80 shadow-cyan-200/50 dark:shadow-cyan-500/30"
};

const SensorCard = ({ icon: Icon, title, value, unit, status, isSimulated, color }: SensorCardProps) => {
  const colorClass = colorClasses[color];
  
  return (
    <Card className={`
      bg-gradient-to-br ${colorClass.gradient} 
      border ${colorClass.border} 
      hover:border-slate-300 dark:hover:border-slate-500/60 
      transition-all duration-300 
      hover:shadow-lg ${colorClass.glow} 
      backdrop-blur-sm
    `}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center justify-between">
          <div className="flex items-center">
            <Icon className={`w-4 h-4 mr-2 ${colorClass.icon}`} />
            {title}
          </div>
          <div className="flex items-center space-x-2">
            {isSimulated && (
              <Badge variant="outline" className="text-xs text-amber-700 dark:text-yellow-400 border-amber-400 dark:border-yellow-400/40 bg-amber-100 dark:bg-yellow-400/10">
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
            <span className="text-lg text-slate-700 dark:text-slate-300 ml-1">{unit}</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`text-xs font-semibold ${
                status === 'normal' ? 'text-emerald-700 dark:text-emerald-400 border-emerald-400 dark:border-emerald-400/40 bg-emerald-100 dark:bg-emerald-400/10' :
                status === 'warning' ? 'text-amber-700 dark:text-amber-400 border-amber-400 dark:border-amber-400/40 bg-amber-100 dark:bg-amber-400/10' :
                status === 'danger' ? 'text-red-700 dark:text-red-400 border-red-400 dark:border-red-400/40 bg-red-100 dark:bg-red-400/10' :
                status === 'low' ? 'text-orange-700 dark:text-orange-400 border-orange-400 dark:border-orange-400/40 bg-orange-100 dark:bg-orange-400/10' :
                'text-cyan-700 dark:text-cyan-400 border-cyan-400 dark:border-cyan-400/40 bg-cyan-100 dark:bg-cyan-400/10'
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
