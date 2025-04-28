"use client";
import DashBoardChart from "@/app/(guide_workspace)/guide/dashboard/_compoenets/bar_chart";
import { QuickStats } from "@/app/(guide_workspace)/guide/dashboard/_compoenets/quik_stats";
import React, { useEffect } from "react";
import { QuisStatsForAdmin } from "../../_compoenets/quik_stats_for_admin";
import { useCookies } from "next-client-cookies";
import isAdmin from "@/hooks/isAdmin";

function page() {
  const [revenue, setRevenue] = React.useState({});
  useEffect(() => {
    const cokkies = useCookies();
    const id = cokkies.get("id");
    const accessToken = cokkies.get("accessToken");
    if (!accessToken) {
      window.location.href = "/login";
    }
    if (!id) {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      const res = await isAdmin(id!, accessToken!);
      if (res === false) {
        window.location.href = "/";
      }
      const revenue = await fetch("http://localhost:4000/subscribtion", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await revenue.json();
      console.log("datadata", data);
      setRevenue(data);
    };
    fetchData();
    console.log("end fetching data");
  }, []);
  return (
    <div className="container mx-auto h-full bg-gradient-to-br from-sky-50 to-white dark:from-slate-900 dark:to-slate-800">
      <main className="p-6">
        <QuisStatsForAdmin />
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

export default page;
