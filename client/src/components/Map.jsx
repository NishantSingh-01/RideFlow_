import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map() {
    return (
        <MapContainer
            className="w-full h-full z-0"
            center={[25.3176, 82.9739]} 
            zoom={13}
            style={{ height: '500px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
            />

            <Marker position={[25.3176, 82.9739]}>
                <Popup>Varanasi</Popup>
            </Marker>
        </MapContainer>
    )
}