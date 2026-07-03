import React, { createContext, useState } from "react"

const RideContext = createContext()

export const RideProvider = ({ children }) => {
  const [rideData, setRideData] = useState({
    pickup: "",
    destination: "",
    distance: null,
    duration: null,
    // rideId=null,
    routeCoordinates: [],
    fare: {
      car: 0,
      bike: 0,
      auto: 0,
    },
    vehicleType: null,
  
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // console.log(rideData)
  return (
    <RideContext.Provider
      value={{
        rideData,
        setRideData,
        loading,
        setLoading,
        error,
        setError,
        // rideId
      }}
    >
      {children}
    </RideContext.Provider>
  )
}

export default RideContext