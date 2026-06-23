import axios from "axios"
import { useState,useEffect } from "react"
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet"

const RideMap = ({ pickup, destination }) => {
    const [route, setRoute] = useState([])

    useEffect(() => {
        const fetchRoute = async () => {
            const res = await axios.get(
                "/api/v1/maps/route",
                {
                    params: { pickup, destination },
                }
            )
            console.log(res.data.data.coordinates)
            setRoute(res.data.data.coordinates)
        }
        if (pickup && destination) {
            fetchRoute()
        }
    }, [pickup, destination])

    return (
        <MapContainer center={pickup} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={pickup} />
            <Marker position={destination} />

            <Polyline positions={route} />
        </MapContainer>
    )
}
export default RideMap
