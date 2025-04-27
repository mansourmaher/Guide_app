import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";

export function QuisStatsForAdmin() {
  const [totlaoffers, setTotlaOffers] = React.useState(0);
  const [totalClients, setTotlaClients] = React.useState(0);
  const [totalGuides, setTotlaGuides] = React.useState(0);
  const [yearlyEarnings, setYearlyEarnings] = React.useState(0);
  useEffect(() => {
    const fetchTotalOffers = async () => {
      const totlaoffers = await fetch("http://localhost:4000/offres", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await totlaoffers.json();
      setTotlaOffers(data.length);
    };
    const fetchTotalClients = async () => {
      const totalClients = await fetch(
        "http://localhost:4000/users/toursitecount/tourists",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await totalClients.json();
      console.log("total clients", data.count);
      setTotlaClients(data.count);
    };
    const fetchTotalGuides = async () => {
      const totalGuides = await fetch(
        "http://localhost:4000/users/guidecount/guides",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await totalGuides.json();
      console.log("total guides", data.count);
      setTotlaGuides(data.count);
    };
    const fetchYearlyEarnings = async () => {
      const yearlyEarnings = await fetch(
        "http://localhost:4000/users/totalearning/year",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await yearlyEarnings.json();
      console.log("yearly earnings", data);
      setYearlyEarnings(data.count);
    };
    fetchTotalOffers();
    fetchTotalClients();
    fetchTotalGuides();
    fetchYearlyEarnings();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Tours"
        value={totlaoffers}
        change="+2"
        icon={<Calendar className="h-5 w-5 text-teal-600" />}
      />
      <StatCard
        title="Total Clients"
        value={totalClients}
        change="+14"
        icon={<Users className="h-5 w-5 text-indigo-600" />}
      />
      <StatCard
        title="Total guides"
        value={totalGuides}
        change="+2.5%"
        icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
      />
      <StatCard
        title="Yearly Earnings"
        value={yearlyEarnings}
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
