import React, { useEffect, useState } from "react"
import axios from "axios"

const LocationSearch = ({
  input, 
  setDestination,
  setRideData,
  setSuggestion,
  setIsExpanded,
}) => {
  const [suggestions, setSuggestions] = useState([])

  const getSuggestions = async (query) => {
    if (!query || query.trim().length === 0) {
      setSuggestions([])
      return
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/maps/get-suggestions`,
        {
          params: { input: query },
          withCredentials: true, // remove if you don't use cookie-based auth
        }
      )

      setSuggestions(res.data.data) // adjust based on your ApiResponse shape
    } catch (err) {
      console.error("Failed to fetch suggestions", err)
      setSuggestions([])
    }
  }

  useEffect(() => {
    getSuggestions(input)
  }, [input])

  return (
    <div className="p-4 scroll">
      {suggestions.map((location, idx) => (
        <div
          key={location.id ?? idx}
          onClick={() => {
            setDestination(location.title ?? location.description)
            setSuggestion(false)
            setRideData((prev) => ({
              ...prev,
              destination: location.title ?? location.description,
            }))
          }}
          className="flex items-center gap-x-1.5 p-3 mt-2 ml-0 cursor-pointer border border-b-gray-400 rounded-2xl hover:bg-gray-100"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
            <i className="fa-solid fa-location-dot text-xl"></i>
          </div>

          <div>
            <h3 className="font-medium">{location.title ?? location.description}</h3>
            <p className="text-sm text-gray-500">{location.address}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LocationSearch