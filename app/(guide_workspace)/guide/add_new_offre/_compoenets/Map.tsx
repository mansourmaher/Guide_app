"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center: number[];
  onChange: (center: number[]) => void;
}
function DraggableMarker({ center, onChange }: MapProps) {
  const [draggable, setDraggable] = useState(false);
  console.log("center from drag", center);
  const [position, setPosition] = useState(center || [51.505, -0.09]);
  console.log("postion from draggable", position);

  const markerRef = useRef(null);
  const map = useMap();
  useEffect(() => {
    map.setView(center || position);
  }, [center]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // @ts-ignore
          setPosition(marker.getLatLng());

          // @ts-ignore
          onChange([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={center || position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

const Map: React.FC<MapProps> = ({ center, onChange }) => {
  console.log("center from map", center);
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [34, 9]}
      zoom={5}
      style={{ height: "70vh", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker center={center} onChange={onChange} />
    </MapContainer>
  );
};
export default Map;
