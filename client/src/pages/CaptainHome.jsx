import React from 'react'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { CaptainContext } from '../Context/CaptainContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainHome = () => {
  const navigate = useNavigate()
  const socket = useContext(SocketContext)
  const { captain } = useContext(CaptainContext)


  const [isOnline, setIsOnline] = useState(false)
  const [data, setdata] = useState(false)
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        // console.log(coords.latitude)
        // console.log(coords.longitude)
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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("Captaintoken")

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/captain/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      localStorage.removeItem("Captaintoken")
      // setUser(null)
      toast.success("Logged out successfully")
      navigate("/captain-login")
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Logout failed"
      )
    }
  }
  const setAvailabilty = () => {
    setIsOnline(prev => !prev)
    toast.success("Toggled")
  }

  useEffect(() => {
    socket.on("new-ride", (ride) => {
        console.log("New Ride:", ride)
        setdata(ride)
    })

    return () => {
        socket.off("new-ride")
    }
}, [])


  return (
    <div>
      <div className="h-screen w-screen relative bg-gray-100">

        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-white shadow-md z-10">
          <div>
            <h2 className="text-lg font-semibold">Hi, {captain?.fullname?.firstname || 'Captain'}</h2>
            <p className="text-sm text-gray-500">{captain?.vehicle?.vehicleType || 'Vehicle Type '}</p>
          </div>

          <div className='gap-2 md:gap-5 flex'>
            <button
              onClick={setAvailabilty}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${isOnline ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
            >
              {isOnline ? 'Online' : 'Offline'}
            </button>
            <button
              onClick={handleLogout}
              className='bg-red-500 p-3 rounded-3xl cursor-pointer'>Logout</button>
          </div>
        </div>
        <div className='p-10 pt-23 bg-amber-300'>
          <h1>new RIde</h1>
          <p>{data.pickup}</p>
          <p>{data.destination}</p>
          <p>{data.fare}</p>
          
        </div>
      </div>
     
    </div>
  )
}

export default CaptainHome
