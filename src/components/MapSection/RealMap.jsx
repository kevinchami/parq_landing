import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

const RealMap = ({ userLocation, parkings }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading map...</div>;

  const center = userLocation
    ? { lat: userLocation.lat, lng: userLocation.lng }
    : { lat: 31.778, lng: 35.235 }; // fallback Jerusalem, por si no hay coords aún

  return (
    <GoogleMap mapContainerStyle={containerStyle} zoom={15} center={center}>
      {/* User location marker */}
      {userLocation && (
        <Marker
          position={center}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}

      {/* Parking markers */}
      {parkings
        .filter((p) => p.coordinates && p.coordinates.lat && p.coordinates.lng)
        .map((p) => (
          <Marker
            key={p.id}
            position={{
              lat: p.coordinates.lat,
              lng: p.coordinates.lng,
            }}
          />
        ))}
    </GoogleMap>
  );
};

export default RealMap;
