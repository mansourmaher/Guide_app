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

function DashBoardChart({ data }: { data: Record<string, number | null> }) {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (!data) return;

    // Convert null values to 0 for the chart
    const chartValues = Object.values(data).map(value => value === null ? 0 : value);
    
    setChartData({
      labels: Object.keys(data),
      datasets: [
        {
          label: "Revenue ($)",
          data: chartValues,
          borderColor: "rgba(53, 162, 235, 1)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Monthly Revenue",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Months",
          },
        },
        y: {
          title: {
            display: true,
            text: "Revenue ($)",
          },
          beginAtZero: true,
        },
      },
    });
  }, [data]);

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