"use client"
import { QuickStats } from "./_compoenets/quik_stats";
import DashBoardChart from "./_compoenets/bar_chart";
import React, { useEffect } from "react";
import { useCookies } from "next-client-cookies";
import { withSubscriptionProtection } from "@/lib/withSubscriptionProtection";



const page=()=> {
  const [revenue, setRevenue] = React.useState({});
  const cokkies = useCookies();
  const userId = cokkies.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/payements/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setRevenue(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto h-full bg-gradient-to-br from-sky-50 to-white dark:from-slate-900 dark:to-slate-800">
      <main className="p-6">
        <QuickStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="lg:col-span-2">
            {/* <TourMap /> */}
            <DashBoardChart data={revenue} />
          </div>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <UpcomingTours />
          </div>
        </div> */}

        {/* <div className="mt-6">
          <MapForDashboard />
        </div> */}
      </main>
    </div>
  );
}

export default withSubscriptionProtection(page);
