import React from 'react'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { CaptainContext } from '../Context/CaptainContext'
import { useEffect } from 'react'

const CaptainHome = () => {
  const socket = useContext(SocketContext)
  const { captain } = useContext(CaptainContext)

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
