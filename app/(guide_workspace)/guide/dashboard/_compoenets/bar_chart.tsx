"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as Chartsjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

Chartsjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashBoardChart() {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "userData ",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Student Count",
        },
      },
    },
  });

  useEffect(() => {
    setChartOptions({
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Courses",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Revenue",
          },
        },
      },
    });
    setChartData({
      labels: [],
      datasets: [
        {
          label: "Revenue",
          data: [],
          borderColor: "rgba(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
    });
  }, []);

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle></CardTitle>
          <CardDescription>
            <div></div>
          </CardDescription>
        </div>
        <div></div>
      </CardHeader>
      <CardContent>
        <div className="">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
}

export default DashBoardChart;
