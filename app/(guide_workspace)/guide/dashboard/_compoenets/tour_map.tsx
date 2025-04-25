"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TourMap() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tour Locations</CardTitle>
            <CardDescription>View and manage your tour routes</CardDescription>
          </div>
          <Tabs
            defaultValue="upcoming"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800">
          {/* This would be replaced with an actual map component */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center">
            {/* Sample tour markers */}
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <MapMarker label="Kyoto Cultural Tour" date="May 15" />
            </div>
            <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
              <MapMarker label="Tokyo City Exploration" date="May 18" />
            </div>
            <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <MapMarker label="Mount Fuji Hike" date="May 22" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-900 p-3 rounded-md shadow-md">
            <p className="text-sm font-medium">Legend</p>
            <div className="flex items-center mt-2">
              <span className="h-3 w-3 rounded-full bg-teal-500 mr-2"></span>
              <span className="text-xs">Upcoming Tours</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="h-3 w-3 rounded-full bg-slate-400 mr-2"></span>
              <span className="text-xs">Past Tours</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

 function MapMarker({ label, date }: any) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <MapPin className="h-8 w-8 text-teal-500 fill-teal-500" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white dark:bg-slate-900 border-2 border-teal-500 flex items-center justify-center text-[10px] font-bold">
          3
        </span>
      </div>
      <div className="mt-1 bg-white dark:bg-slate-900 rounded-md shadow-md p-2 text-center">
        <p className="text-xs font-medium">{label}</p>
        <p className="text-[10px] text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}
