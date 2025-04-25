import { QuickStats } from "./_compoenets/quik_stats";
import { UpcomingTours } from "./_compoenets/upcoming_tours";
import MapForDashboard from "./_compoenets/MapFordashboard";
import DashBoardChart from "./_compoenets/bar_chart";

function page() {
  return (
    <div className="container mx-auto h-full bg-gradient-to-br from-sky-50 to-white dark:from-slate-900 dark:to-slate-800">
      <main className="p-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
          Welcome back, Alex
        </h1>
        <QuickStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="lg:col-span-2">
            {/* <TourMap /> */}
            <DashBoardChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <UpcomingTours />
          </div>
        </div>

        <div className="mt-6">
          <MapForDashboard />
        </div>
      </main>
    </div>
  );
}

export default page;
