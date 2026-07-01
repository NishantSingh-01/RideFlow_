import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Map from '../components/Map'
import LocationSearch from '../components/LoacationSearch'
import RideContext from '../Context/RideContext'
import { toast } from 'react-toastify'
const HomeMobile = ({
  pickup,
  setPickup,
  destination,
  setDestination,
  isExpanded,
  setIsExpanded,
  isSuggestion,
  setSuggestion,
}) => {
  const { rideData, setRideData } = useContext(RideContext)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!pickup.trim()) {
      toast.error("Please enter pickup location")
      return
    }

    if (!destination.trim()) {
      toast.error("Please enter destination location")
      return
    }
    // try {
    //   const token = localStorage.getItem("token")
    //   if (!token) {
    //     toast.error("Please Login first")
    //     return
    //   }
    //   await axios.get(
    //     `${import.meta.env.VITE_API_URL}/maps/route`,
    //     {
    //       params: {
    //         pickup,
    //         destination,
    //       },
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )

    //   navigate(
    //     `/select-vehicle?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`
    //   )
    // } catch (error) {
    //   toast.error("Please enter valid locations")
    // }

      navigate(
        `/select-vehicle?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`
      )
    setPickup('')
    setDestination('')
  }


  return (
    <>
      <div className="absolute inset-0 z-0 md:hidden">
        <Map />
      </div>

      <div
        className={`
          md:hidden
          absolute bottom-0 left-0 right-0
          bg-white rounded-t-2xl
          transition-all duration-300
          ${isExpanded ? "h-[75vh]" : "h-[35vh]"}
        `}
      >
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-1.5 bg-gray-400 rounded-full mx-auto mt-3 cursor-pointer"
        />

        <div className="p-5">
          <h1 className="text-3xl font-semibold mb-4">
            Find a trip
          </h1>

          <div className="bg-gray-100 rounded-xl p-4 mb-3 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>

            <input
              type="text"
              required
              value={pickup}
              onFocus={() => setIsExpanded(true)}
              onChange={(e) => {
                setPickup(e.target.value),
                  setRideData({
                    ...rideData,
                    pickup: e.target.value,
                  })
              }
              }
              className="w-full bg-transparent outline-none"
              placeholder="Pickup"
            />
          </div>

          <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>

            <input
              type="text"
              required
              value={destination}
              onFocus={() => {
                setIsExpanded(true)
                setSuggestion(true)
              }}
              onChange={(e) => {
                setRideData({
                  ...rideData,
                  destination: e.target.value,
                })
                setDestination(e.target.value)
                setIsExpanded(true)
                setSuggestion(true)
              }}
              className="w-full bg-transparent outline-none"
              placeholder="Where are you going?"
            />
          </div>

          {isExpanded && (
            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-gray-900 text-white rounded-xl py-3">
              Search Ride
            </button>
          )}

          {isSuggestion && (
            <div className="mt-3 max-h-[250px] overflow-y-auto rounded-xl bg-white shadow-md">
              <LocationSearch 
                // input={pickup,destination}
                setDestination={setDestination}
                setSuggestion={setSuggestion}
                setIsExpanded={setIsExpanded}
                setRideData={setRideData}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HomeMobile