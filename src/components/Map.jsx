"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const position = [10.878445, 106.809055];
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIcon(
        L.icon({
          iconUrl: "/img/location.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })
      );
    }
  }, []);

  if (!icon) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={position} zoom={16} className="w-full h-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={icon}>
        <Popup>
          Yexiu Café
          <br />
          168 Ta Quang Buu Street
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;