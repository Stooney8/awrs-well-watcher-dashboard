
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

const statusColors = {
  normal: "bg-emerald-500 shadow-emerald-200/50 dark:shadow-emerald-500/30",
  warning: "bg-amber-500 shadow-amber-200/50 dark:shadow-amber-500/30",
  danger: "bg-red-500 shadow-red-200/50 dark:shadow-red-500/30",
  low: "bg-orange-500 shadow-orange-200/50 dark:shadow-orange-500/30",
  high: "bg-cyan-500 shadow-cyan-200/50 dark:shadow-cyan-500/30"
};

const SensorCard = ({ icon: Icon, title, value, unit, status, isSimulated, color }: SensorCardProps) => {
  return (
    <Card className="
      bg-white dark:bg-slate-800/90
      border border-slate-200 dark:border-slate-700
      hover:border-slate-300 dark:hover:border-slate-600
      transition-all duration-300 
      hover:shadow-lg hover:shadow-slate-200/20 dark:hover:shadow-slate-900/40
      backdrop-blur-sm
    ">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <div className="flex items-center">
            <Icon className="w-4 h-4 mr-2 text-slate-600 dark:text-slate-400" />
            {title}
          </div>
          <div className="flex items-center space-x-2">
            {isSimulated && (
              <Badge variant="outline" className="text-xs text-amber-700 dark:text-amber-400 border-amber-400 dark:border-amber-400/60 bg-amber-50 dark:bg-amber-400/10">
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
            <span className="text-lg text-slate-600 dark:text-slate-400 ml-1">{unit}</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`text-xs font-semibold ${
                status === 'normal' ? 'text-emerald-700 dark:text-emerald-400 border-emerald-400 dark:border-emerald-400/60 bg-emerald-50 dark:bg-emerald-400/10' :
                status === 'warning' ? 'text-amber-700 dark:text-amber-400 border-amber-400 dark:border-amber-400/60 bg-amber-50 dark:bg-amber-400/10' :
                status === 'danger' ? 'text-red-700 dark:text-red-400 border-red-400 dark:border-red-400/60 bg-red-50 dark:bg-red-400/10' :
                status === 'low' ? 'text-orange-700 dark:text-orange-400 border-orange-400 dark:border-orange-400/60 bg-orange-50 dark:bg-orange-400/10' :
                'text-cyan-700 dark:text-cyan-400 border-cyan-400 dark:border-cyan-400/60 bg-cyan-50 dark:bg-cyan-400/10'
              }`}
            >
              {status.toUpperCase()}
            </Badge>
            <span className="text-xs text-slate-500 dark:text-slate-500 font-mono">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
