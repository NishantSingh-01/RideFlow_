// import React from 'react'
// import NormalNavbar from '../components/NormalNavbar'
// import Map from '../components/Map'

// const Arrived = () => {

//     useEffect(() => {
//         const watchId = navigator.geolocation.watchPosition(
//             ({ coords }) => {
//                 console.log(coords.latitude, coords.longitude)
//                 setPosition({ lat: coords.latitude, lng: coords.longitude })
//                 socket.emit('update-captain-location', {
//                     captainId: captain.id,
//                     latitude: coords.latitude,
//                     longitude: coords.longitude
//                 })
//             },
//             (err) => console.error('Geolocation error', err),
//             {
//                 enableHighAccuracy: true,
//                 maximumAge: 10000,
//                 timeout: 15000
//             }
//         )
//         return () => navigator.geolocation.clearWatch(watchId)
//     }, [])
//     const getDistannceAndTime = async () => {
//         const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLng},${pickupLat};${dropoffLng},${dropoffLat}?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`)
//     }
//     return (
//         <div>
//             <NormalNavbar />
//             <div>
//                 <Map />
//             </div>
//             <div>
//                 <div>Pickup Location</div>
//                 <div>
//                     <p></p>
//                     <p></p>

//                 </div>
//             </div>
//         </div>
//     )
// }


// import React, { useEffect, useState, useRef, useContext } from 'react'
// import axios from 'axios'
// import NormalNavbar from '../components/NormalNavbar'
// import Map from '../components/Map'
// import { SocketContext } from '../Context/SocketContext'
// import { CaptainContext } from '../Context/CaptainContext'
// import { useLocation } from 'react-router-dom'
// import RideMap from '../components/RideMap'

// const Arrived = () => {
//     const location = useLocation()
//     const { dropoffLat, dropoffLng } = location.state || {}

//     const socket = useContext(SocketContext)
//     const { captain } = useContext(CaptainContext)

//     const [position, setPosition] = useState(null)
//     const [distance, setDistance] = useState(null)
//     const [duration, setDuration] = useState(null)
//     const [routeCoordinates, setRouteCoordinates] = useState(null)
//     const [loading, setLoading] = useState(false)

//     const positionRef = useRef(null)

//     useEffect(() => {
//         const watchId = navigator.geolocation.watchPosition(
//             ({ coords }) => {
//                 const newPos = { lat: coords.latitude, lng: coords.longitude }
//                 setPosition(newPos)
//                 positionRef.current = newPos

//                 socket.emit('update-captain-location', {
//                     captainId: captain.id,
//                     latitude: coords.latitude,
//                     longitude: coords.longitude
//                 })
//             },
//             (err) => console.error('Geolocation error', err),
//             {
//                 enableHighAccuracy: true,
//                 maximumAge: 10000,
//                 timeout: 15000
//             }
//         )
//         return () => navigator.geolocation.clearWatch(watchId)
//     }, [])

//     // Fetch route from your own backend every 10s using latest position
//     useEffect(() => {
//         if (!dropoffLat || !dropoffLng) return

//         const fetchRoute = async () => {
//             const pos = positionRef.current
//             if (!pos) return

//             try {
//                 setLoading(true)
//                 const token = localStorage.getItem("Captaintoken")

//                 const res = await axios.get(
//                     `${import.meta.env.VITE_API_URL}/maps/route`,
//                     {
//                         params: {
//                             pickup: `${pos.lat},${pos.lng}`,
//                             destination: `${dropoffLat},${dropoffLng}`,
//                         },
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 )
//                 const routeData = res.data.data
//                 setDistance(routeData.distance)
//                 setDuration(routeData.duration)
//                 setRouteCoordinates(routeData.geometry)
//             } catch (error) {
//                 console.error(error.response?.data?.message || "Failed to fetch route")
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchRoute() // run once immediately
//         const intervalId = setInterval(fetchRoute, 10000)

//         return () => clearInterval(intervalId)
//     }, [dropoffLat, dropoffLng])

//     return (
//         <div>
//             <NormalNavbar />
//             <div>
//                 <RideMap position={position} routeCoordinates={routeCoordinates} />
//             </div>
//             <div>
//                 <div>Pickup Location</div>
//                 <div>
//                     <p>{distance ? `${(distance / 1000).toFixed(2)} km` : 'Calculating...'}</p>
//                     <p>{duration ? `${Math.ceil(duration / 60)} min` : ''}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Arrived



import React from 'react'
import NormalNavbar from '../components/NormalNavbar'
import Map from '../components/Map'
import { MapPin } from "lucide-react";

const Arrived = () => {
    return (
        <div className='flex flex-col h-full w-full gap-4  md:flex-row-reverse md:justify-around md:gap-10'>
            <NormalNavbar />
            <div className='flex md:mt-20 mt-7 flex-col items-center justify-center  md:flex-row-reverse md:justify-around md:gap-10'>
                <div className='h-[50vh] w-full  overflow-x-hidden md:h-[490px] md:w-[950px] shadow-xl rounded-lg overflow-hidden relative z-0'>
                    <Map />
                </div>
                <div className='  w-full h-[39vh] rounded-xl md:w-[500px]  p-4 rounded-lg '>
                    <h1 className='text-xl flex items-center gap-2 font-bold font-mono pl-2 md:pl-5 md:text-3xl'>Pickup Location
                        <MapPin className="w-6 h-6 text-green-600" />
                    </h1>
                    <div className='flex items-center justify-around gap-42 mt-4 md:mt-8 md:gap-58'>
                        <p className='text-lg font-medium ' >1.2 km Away</p>
                        <p className='text-lg font-medium text-blue-600' >5 mins</p>
                    </div>
                    <div className='flex items-center justify-center gap-54 md:mt-8  mt-4'>
                        <button
                            className="w-full mt-4 bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-xl"
                        >
                            I'm Arrived
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Arrived
