import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map({ position }) {
    return (
        <MapContainer
            className="w-full h-full z-0"
            center={position || [25.3176, 82.9739]} 
            zoom={14}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
            />

            <Marker position={position || [25.3176, 82.9739]}>
                <Popup>Varanasi</Popup>
            </Marker>
        </MapContainer>
    )
}