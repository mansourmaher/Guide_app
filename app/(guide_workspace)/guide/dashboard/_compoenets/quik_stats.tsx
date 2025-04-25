import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Upcoming Tours"
        value="12"
        change="+2"
        icon={<Calendar className="h-5 w-5 text-teal-600" />}
      />
      <StatCard
        title="Total Clients"
        value="87"
        change="+14"
        icon={<Users className="h-5 w-5 text-indigo-600" />}
      />
      <StatCard
        title="Satisfaction Rate"
        value="96%"
        change="+2.5%"
        icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
      />
      <StatCard
        title="Monthly Earnings"
        value="$4,250"
        change="+$850"
        icon={<DollarSign className="h-5 w-5 text-amber-600" />}
      />
    </div>
  );
}

function StatCard({ title, value, change, icon }: any) {
  const isPositive = change.startsWith("+");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
            {icon}
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span
            className={cn(
              "text-xs font-medium flex items-center",
              isPositive ? "text-emerald-600" : "text-red-600"
            )}
          >
            {change}
            <ArrowUpRight
              className={cn("h-3 w-3 ml-1", !isPositive && "rotate-180")}
            />
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            vs. last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
