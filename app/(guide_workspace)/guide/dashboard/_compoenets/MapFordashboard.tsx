"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { renderToString } from "react-dom/server";

const nearbyLocations = [
  { lat: 36.7333, lng: 10.2 },
  { lat: 34.7391, lng: 10.76 },
  { lat: 33.8815, lng: 10.8572 },
  { lat: 32.3167, lng: 10.9333 },
];

function MapMarker({
  label,
  date,
  index,
}: {
  label: string;
  date: string;
  index: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="">
        <MapPin className="h-8 w-8 text-teal-500 fill-teal-500" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white dark:bg-slate-900 border-2 border-teal-500 flex items-center justify-center text-[10px] font-bold">
          {index}
        </span>
      </div>
      <div className="mt-1 bg-white dark:bg-slate-900 rounded-md shadow-md p-2 text-center">
        <p className="text-xs font-medium">{label}</p>
        <p className="text-[10px] text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}

const CustomMarker = ({
  position,
  label,
  date,
  index,
}: {
  position: [number, number];
  label: string;
  date: string;
  index: number;
}) => {
  const icon = L.divIcon({
    html: renderToString(<MapMarker label={label} date={date} index={index} />),
    className: "custom-marker-icon",
    iconSize: [60, 60],
    iconAnchor: [30, 60],
  });

  return <Marker position={position} icon={icon} />;
};

const MapForDashboard: React.FC = () => {
  return (
    <Card className="h-full overflow-hidden  shadow-md border border-slate-100 dark:border-slate-700 transition-all hover:shadow-xl bg-white dark:bg-slate-900 rounded-2xl">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-t-md">
        <h2 className="text-lg font-semibold">Tour Locations</h2>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          View and manage your tour routes
        </CardDescription>
      </div>

      <div className="relative h-[400px] rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800">
        <MapContainer
          center={nearbyLocations[0]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
          className="rounded-md z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {nearbyLocations.map((location, index) => (
            <CustomMarker
              key={index}
              position={[location.lat, location.lng]}
              label={`Location ${index + 1}`}
              date={`Date ${index + 1}`}
              index={index + 1}
            />
          ))}
        </MapContainer>
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
    </Card>
  );
};

export default MapForDashboard;
