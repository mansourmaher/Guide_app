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
import { useCookies } from "next-client-cookies";

export function QuickStats() {
  const [totlaoffers, setTotlaOffers] = React.useState(0);
  const [totalClients, setTotlaClients] = React.useState(0);
  const [totalGuides, setTotlaGuides] = React.useState(0);
  const [yearlyEarnings, setYearlyEarnings] = React.useState(0);
  const [rate, setRate] = React.useState(0);
  const cookkies = useCookies();
  const userId = cookkies.get("id");

  useEffect(() => {
    const fetchTotalOffers = async () => {
      const totlaoffers = await fetch(
        `http://localhost:4000/offres/countActiveOffres/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await totlaoffers.json();
      setTotlaOffers(data.offers);
      console.log("total offers", data.length);
    };
    const fetchTotalClients = async () => {
      const totalClients = await fetch(
        `http://localhost:4000/offres/countNbPersonneCurrentByGuideId/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await totalClients.json();
      console.log("total clientsssssssssssss", data.nbPersonnes);
      setTotlaClients(data.nbPersonnes);
    };
    const fetchTotalRate = async () => {
      const totalGuides = await fetch(
        `http://localhost:4000/reviews/satisfactionRate/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await totalGuides.json();
      console.log("total guides", data.count);
      setRate(data.satisfactionRate);
    };
    const fetchYearlyEarnings = async () => {
      const yearlyEarnings = await fetch(
        `http://localhost:4000/payements/totalAmountThisYear/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await yearlyEarnings.json();
      console.log("yearly earnings", data);
      setYearlyEarnings(data.totalAmount);
    };
    fetchTotalOffers();
    fetchTotalClients();
    fetchTotalRate();
    fetchYearlyEarnings();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Upcoming Tours"
        value={totlaoffers}
        icon={<Calendar className="h-5 w-5 text-teal-600" />}
      />
      <StatCard
        title="Total Clients"
        value={totalClients}
        icon={<Users className="h-5 w-5 text-indigo-600" />}
      />
      <StatCard
        title="Satisfaction Rate"
        value={rate+"%"}
        icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
      />
      <StatCard
        title="Monthly Earnings"
        value={yearlyEarnings}
        icon={<DollarSign className="h-5 w-5 text-amber-600" />}
      />
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
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
      </CardContent>
    </Card>
  );
}
