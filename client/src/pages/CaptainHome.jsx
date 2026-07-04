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

    <div className="  bg-gray-100 max-sm:overflow-y-hidden overflow-x-hidden">
      <CaptainNavbar />

      <div className="mt-6  flex flex-col md:flex-row-reverse md:mt-10 md:justify-center md:gap-15 flex-1">
        <div className="h-[51vh]  md:mt-7 md:h-[490px] md:w-[750px] shadow-xl rounded-lg overflow-hidden relative z-0">
          <Map position={position} />
          
        </div>

        <div className="mt-0 md:mt-10 h-[49vh] md:h-[560px] md:w-[550px] rounded-t-2xl md:rounded-none scroll-auto overflow-y-auto">

          <div className="scroll-auto  bg-white p-4 overflow-y-auto">

            <h1 className="text-2xl font-bold">
              Welcome, {captain?.firstname || "Captain"} 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1 mb-6">
              Ready to accept rides.
            </p>

            {RidePopup && Ride ? (
              <div className="bg-blue-50 border border-blue-300 rounded-xl p-4 mb-4 animate-pulse-once">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-blue-700">🚕 New Ride Available</span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Live</span>
                </div>

                <div className="space-y-1 text-sm text-gray-700 mb-4">
                  <p className="wrap-break-word"><span className="font-medium">Pickup:</span> {Ride.pickup}</p>
                  <p className="wrap-break-word"><span className="font-medium">Destination:</span> {Ride.destination}</p>
                  <p><span className="font-medium">Fare:</span> ₹{Ride.fare}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={confirmRide}
                    disabled={confirming}
                    className="flex-1 bg-green-500 disabled:bg-green-300 text-white px-4 py-2 rounded-full font-medium"
                  >
                    {confirming ? 'Confirming...' : 'Accept'}
                  </button>
                  <button
                    onClick={rejectRide}
                    disabled={confirming}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-medium"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-semibold text-green-600">● Online</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">Location</span>
                  <span>Live GPS</span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">Today's Trips</p>
                <h2 className="text-2xl font-bold">8</h2>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">Earnings</p>
                <h2 className="text-2xl font-bold">₹980</h2>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>




  )
}

export default CaptainHome
