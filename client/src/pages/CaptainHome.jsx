import React from 'react'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { CaptainContext } from '../Context/CaptainContext'
import { useEffect } from 'react'

const CaptainHome = () => {
  const socket = useContext(SocketContext)
  const { captain } = useContext(CaptainContext)

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        socket.emit('update-captain-location', {
          captainId: captain.id,
          latitude: coords.latitude,
          longitude: coords.longitude
        })
      },
      (err) => console.error('Geolocation error', err),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

   console.log(captain)
  useEffect(() => {
    socket.emit("join", {
      userId: captain.id,
      userType: "captain"
    })
  }, [socket])
  return (
    <div>
      CaptainHome

    </div>
  )
}

export default CaptainHome
