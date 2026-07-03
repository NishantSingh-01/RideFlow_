import React from 'react'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { CaptainContext } from '../Context/CaptainContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CaptainNavbar from '../components/CaptainNavbar'
import NormalNavbar from '../components/NormalNavbar'
import Map from '../components/Map'

const CaptainHome = () => {
  const navigate = useNavigate()
  const socket = useContext(SocketContext)
  const { captain } = useContext(CaptainContext)

  const [Ride, setRide] = useState(false)
  const [position, setPosition] = useState(null)
  const [RidePopup, setRidePopup] = useState(false)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        // console.log(coords.latitude, coords.longitude)
        setPosition({ lat: coords.latitude, lng: coords.longitude })
        socket.emit('update-captain-location', {
          captainId: captain.id,
          latitude: coords.latitude,
          longitude: coords.longitude
        })
      },
      (err) => console.error('Geolocation error', err),
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 15000
      }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  useEffect(() => {
    socket.emit("join", {
      userId: captain.id,
      userType: "captain"
    })
  }, [socket])


  useEffect(() => {
    socket.on("new-ride", (ride) => {
      console.log("New Ride:", ride)
      setRide(ride)
      setRidePopup(true)
    })
    return () => {
      socket.off("new-ride")
    }
  }, [])

  const confirmRide = async () => {
    if (!Ride) return
    setConfirming(true)
    try {
      const token = localStorage.getItem('Captaintoken')

      await axios.post(`${import.meta.env.VITE_API_URL}/ride/confirm-ride`, {
        rideId: Ride.id,
        status: 'accepted',
        captainId: captain.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success('Ride confirmed successfully')
      setRidePopup(false)
      // navigate(`/captain-riding/${Ride.id}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to confirm ride')
    } finally {
      setConfirming(false)
    }
  }
  const rejectRide = () => {
    setRidePopup(false)
    setRide(null)
  }
  return (
    // <div className="h-screen w-screen bg-gray-100">
    //   <CaptainNavbar />

    //   <div className="pt-20 flex flex-row-reverse items-start justify-around gap-4 max-sm:flex-col-reverse max-sm:gap-2 max-sm:pt-16 ">

    //     <div className="scroll-auto  bg-white p-6 overflow-y-auto">
    //       <h1 className="text-2xl font-bold">
    //         Welcome, {captain?.firstname || "Captain"} 👋
    //       </h1>
    //       <p className="text-gray-500 text-sm mt-1 mb-6">
    //         Ready to accept rides.
    //       </p>

    //       {RidePopup && Ride ? (
    //         <div className="bg-blue-50 border border-blue-300 rounded-xl p-4 mb-4 animate-pulse-once">
    //           <div className="flex justify-between items-center mb-3">
    //             <span className="font-semibold text-blue-700">🚕 New Ride Available</span>
    //             <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Live</span>
    //           </div>

    //           <div className="space-y-1 text-sm text-gray-700 mb-4">
    //             <p><span className="font-medium">Pickup:</span> {Ride.pickup}</p>
    //             <p><span className="font-medium">Destination:</span> {Ride.destination}</p>
    //             <p><span className="font-medium">Fare:</span> ₹{Ride.fare}</p>
    //           </div>

    //           <div className="flex gap-2">
    //             <button
    //               onClick={confirmRide}
    //               disabled={confirming}
    //               className="flex-1 bg-green-500 disabled:bg-green-300 text-white px-4 py-2 rounded-full font-medium"
    //             >
    //               {confirming ? 'Confirming...' : 'Accept'}
    //             </button>
    //             <button
    //               onClick={rejectRide}
    //               disabled={confirming}
    //               className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-medium"
    //             >
    //               Ignore
    //             </button>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
    //           <div className="flex justify-between">
    //             <span className="text-gray-600">Status</span>
    //             <span className="font-semibold text-green-600">● Online</span>
    //           </div>
    //           <div className="flex justify-between mt-2">
    //             <span className="text-gray-600">Location</span>
    //             <span>Live GPS</span>
    //           </div>
    //         </div>
    //       )}

    //       <div className="grid grid-cols-2 gap-3 mb-4">
    //         <div className="bg-blue-50 rounded-xl p-4 text-center">
    //           <p className="text-xs text-gray-500">Today's Trips</p>
    //           <h2 className="text-2xl font-bold">8</h2>
    //         </div>
    //         <div className="bg-yellow-50 rounded-xl p-4 text-center">
    //           <p className="text-xs text-gray-500">Earnings</p>
    //           <h2 className="text-2xl font-bold">₹980</h2>
    //         </div>
    //       </div>
    //     </div>
    //     <div className='border object-fill overflow-hidden mt-3 max-sm:mt-0  relative z-0" w-[920px] h-[70vh] flex-row-reverse rounded-2xl border-gray-100 max-sm:h-[44vh] ' >
    //       <Map position={position} />
    //     </div>
    //   </div>
    // </div>
<div className="h-screen w-screen bg-gray-100 overflow-hidden">
    <CaptainNavbar />

    <div className="pt-16 lg:pt-20 h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] flex flex-col lg:flex-row-reverse">

      {/* Map */}
      <div className="w-full lg:w-2/3 h-[50vh] lg:h-full p-2 lg:p-4">
        <div className="w-full h-full overflow-hidden rounded-2xl shadow-lg border border-gray-200">
          <Map position={position} />
        </div>
      </div>

      {/* Dashboard */}
      <div className="w-full lg:w-1/3 bg-white rounded-t-3xl lg:rounded-none lg:shadow-lg overflow-y-auto p-5">

        <h1 className="text-2xl font-bold">
          Welcome, {captain?.firstname || "Captain"} 👋
        </h1>

        <p className="text-sm text-gray-500 mt-1 mb-5">
          Ready to accept rides.
        </p>

        {RidePopup && Ride ? (
          <div className="bg-blue-50 border border-blue-300 rounded-xl p-4 mb-5">

            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-blue-700">
                🚕 New Ride Request
              </h2>

              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                Live
              </span>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <p>
                <span className="font-medium">Pickup:</span> {Ride.pickup}
              </p>

              <p>
                <span className="font-medium">Destination:</span>{" "}
                {Ride.destination}
              </p>

              <p>
                <span className="font-medium">Fare:</span> ₹{Ride.fare}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmRide}
                disabled={confirming}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 disabled:bg-green-300"
              >
                {confirming ? "Confirming..." : "Accept"}
              </button>

              <button
                onClick={rejectRide}
                disabled={confirming}
                className="flex-1 bg-gray-200 hover:bg-gray-300 rounded-lg py-2"
              >
                Ignore
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5">
            <div className="flex justify-between">
              <span>Status</span>
              <span className="font-semibold text-green-600">
                ● Online
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Location</span>
              <span>Live GPS</span>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">

          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500">Today's Trips</p>
            <h2 className="text-2xl font-bold mt-1">8</h2>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500">Today's Earnings</p>
            <h2 className="text-2xl font-bold mt-1">₹980</h2>
          </div>

        </div>

      </div>

    </div>
  </div>


  )
}

export default CaptainHome
