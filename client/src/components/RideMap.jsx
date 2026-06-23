import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet"
import RideContext from "../Context/RideContext"
import { toast } from "react-toastify"
import L from "leaflet"
import Loader from "./Loader"
const RideMap = ({ pickup, destination }) => {
    const pickupIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconUrl: "https://cdn-icons-png.flaticon.com/128/3892/3892652.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
    })

    const destinationIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/8340/8340715.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
    })

    const { rideData, setRideData } = useContext(RideContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchRoute = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem("token")
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/maps/route`,
                    {
                        params: {
                            pickup: rideData.pickup,
                            destination: rideData.destination,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                const routeData = res.data.data
                // console.log(routeData)
                setRideData(prev => ({
                    ...prev,
                    distance: routeData.distance,
                    duration: routeData.duration,
                    routeCoordinates: routeData.geometry
                }))
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch route"
                )
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }
        if (rideData.pickup && rideData.destination) {
            fetchRoute()
        }
    }, [rideData.pickup, rideData.destination, setRideData,])

    const positions =
        rideData.routeCoordinates?.map(
            ([lng, lat]) => [lat, lng]
        ) || []

    if (positions.length === 0) {
        return null
    }
    if (loading) {
        return <Loader />
    }
    return (
        <MapContainer
            center={positions[0]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
                position={positions[0]}
                icon={pickupIcon}
            />

            <Marker
                position={positions[positions.length - 1]}
                icon={destinationIcon}
            />

            <Polyline positions={positions} />
        </MapContainer>
    )
}
export default RideMap
