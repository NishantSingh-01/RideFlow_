import React from 'react'
import Map from '../components/Map'
import LocationSearch from '../components/LoacationSearch'

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
              value={pickup}
              onFocus={() => setIsExpanded(true)}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder="Pickup"
            />
          </div>

          <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>

            <input
              type="text"
              value={destination}
              onFocus={() => {
                setIsExpanded(true)
                setSuggestion(true)
              }}
              onChange={(e) => {
                setDestination(e.target.value)
                setIsExpanded(true)
                setSuggestion(true)
              }}
              className="w-full bg-transparent outline-none"
              placeholder="Where are you going?"
            />
          </div>

          {isExpanded && (
            <button className="w-full mt-4 bg-gray-900 text-white rounded-xl py-3">
              Search Ride
            </button>
          )}

          {isSuggestion && (
            <div className="mt-3 max-h-[250px] overflow-y-auto rounded-xl bg-white shadow-md">
              <LocationSearch
                setDestination={setDestination}
                setSuggestion={setSuggestion}
                setIsExpanded={setIsExpanded}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HomeMobile