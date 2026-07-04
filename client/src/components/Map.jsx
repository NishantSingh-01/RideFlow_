import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function ChangeView({ center }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, 14, {
                animate: true,
            });
        }
    }, [center, map]);

    return null;
}

export default function Map({ position }) {
    const defaultPosition = [25.3176, 82.9739];

    const currentPosition = position || defaultPosition;

    const pickupIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/1048/1048328.png",
        iconSize: [33, 33],
        iconAnchor: [21, 43],
        popupAnchor: [0, -43],
    });

    return (
        <MapContainer
            center={currentPosition}
            zoom={14}
            className="w-full h-full z-0"
            style={{ height: "100%", width: "100%" }}
        >
            <ChangeView center={currentPosition} />

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            <Marker
                position={currentPosition}
                icon={pickupIcon}
            >
                <Popup>
                    {position ? "Selected Location" : "Varanasi"}
                </Popup>
            </Marker>
        </MapContainer>
    );
}