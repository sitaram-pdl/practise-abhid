import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in React + Leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LeafletMapPropsType {
  Longitude: number;
  Latitude: number;
}

export default function LeafletMap({ Longitude, Latitude }: LeafletMapPropsType) {
  const position: [number, number] = [Latitude, Longitude];

  // Function to open Google Maps in a new tab
  const openGoogleMaps = () => {
    const [lat, lng] = position;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg border">
      {/* Map */}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            📍
          </Popup>
        </Marker>
      </MapContainer>

      {/* Button positioned in top-right corner */}
      <button
        onClick={openGoogleMaps}
        className="absolute top-2 right-2 z-[9999] px-4 py-2 bg-emerald-400 hover:bg-emerald-500 text-white text-sm font-semibold rounded-md shadow-md"
      >
        View Larger Map
      </button>
    </div>
  );
}
