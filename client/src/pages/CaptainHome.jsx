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
import Footer from '../components/Footer'
import { Hand, Car, MapPin, IndianRupee, Radio, CircleDot } from "lucide-react"
const CaptainHome = () => {
  const navigate = useNavigate()
  const socket = useContext(SocketContext)
  const { captain } = useContext(CaptainContext)

  const [Ride, setRide] = useState(false)
  const [position, setPosition] = useState(null)
  const [RidePopup, setRidePopup] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [height, setHeight] = useState(false)

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        console.log(coords.latitude, coords.longitude)
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
      setHeight(true)
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
      navigate(`/captain-riding/${Ride.id}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to confirm ride')
    } finally {
      setConfirming(false)
    }
  }
  const rejectRide = () => {
    setRidePopup(false)
    setRide(null)
    setHeight(false)
  }
  return (

    <>
      <div className="   max-sm:overflow-y-hidden overflow-x-hidden">
        <CaptainNavbar />

        <div className="mt-6 mb-6 flex flex-col md:flex-row-reverse md:mt-10 md:justify-center md:gap-15 flex-1">
          <div className={`md:mt-16 md:w-[750px]  shadow-xl rounded-lg overflow-hidden relative z-0 ${height ? 'h-[30vh] md:h-[300px]' : 'h-[51vh] md:h-[490px]'}`}>
            <Map position={position} />

          </div>

          <div className="mt-0 md:mt-17 h-[vh] md:h-[520px] md:w-[550px]  rounded-t-2xl md:rounded-none scroll-auto overflow-y-auto">
            <div
              onClick={() => setHeight(!height)}
              className="w-14 h-1.5 bg-gray-400 rounded-full mx-auto mt-3 cursor-pointer lg:hidden"
            />

            <div className="scroll-auto  bg-white p-4 overflow-y-auto max-sm:pb-48">

              <h1 className="text-3xl flex items-center gap-2 font-bold">
                Welcome, {captain?.firstname || "Captain"}       <Hand size={26} className="text-blue-500" />
              </h1>
              <p className="text-gray-500 text-lg mt-1 ml-1 mb-6">
                Ready to accept rides.
              </p>

              {RidePopup && Ride ? (
                <div className="bg-blue-50 border border-blue-600 rounded-xl p-4 mb-4 animate-pulse-once">
                  <div className="flex justify-between items-center mb-3">
                    <span className="flex gap-2 items-center  font-semibold text-blue-700"><span><img height="23" width="24" src="https://cdn-icons-png.flaticon.com/128/1048/1048328.png" alt="" /></span> <span className="font-semibold text-lg font-mono font ">New Ride Available</span></span>
                    <span className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-xl">Live</span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-700 mb-4">
                    <p className="wrap-break-word"><span className="font-medium text-[16px] text-gray-900">Pickup:</span> {Ride.pickup}</p>
                    <p className="wrap-break-word"><span className="font-medium text-[16px] text-gray-900">Destination:</span> {Ride.destination}</p>
                    <p><span className="font-medium text-[16px] text-gray-900">Fare:</span> ₹{Ride.fare}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={confirmRide}
                      disabled={confirming}
                      className="flex-1 bg-green-500 disabled:bg-green-300 text-white px-4 py-2 rounded-xl font-medium"
                    >
                      {confirming ? 'Confirming...' : 'Accept'}
                    </button>
                    <button
                      onClick={rejectRide}
                      disabled={confirming}
                      className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium"
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-600 rounded-xl p-4 mb-4">
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
              <div className="bg-pink-100 border border-pink-600 rounded-xl flex items-center justify-around gap-33 max-sm:gap-23  p-4 mb-4 shadow-sm flex items-center ">
                <div>
                  <Car size={42} className="text-blue-600" />
                </div>
                <div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Vehicle Details</p>

                  <p className="text-sm text-gray-800">
                    {captain?.plate || 'Unknown registration'}
                  </p>
                  <p className="text-sm text-gray-600">{captain?.color || 'Unknown color'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 border border-blue-600 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500">Today's Trips</p>
                  <h2 className="text-2xl font-bold">8</h2>
                </div>
                <div className="bg-yellow-50 border border-yellow-600 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500">Earnings</p>
                  <h2 className="text-2xl font-bold">₹980</h2>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
      <Footer showOnMobile={false} />
    </>




  )
}

export default CaptainHome
