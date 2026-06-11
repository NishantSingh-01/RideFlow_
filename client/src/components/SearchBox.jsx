import React from "react";

const SearchBox = ({
  pickup,
  setPickup,
  destination,
  setDestination,
  filteredSuggestions,
  selectLocation,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        shadow-xl
        p-6
        w-[420px]
        ${className}
      `}
    >
      <h1 className="text-4xl font-bold mb-6">Where to?</h1>

      {/* Pickup */}
      <div className="bg-gray-100 rounded-xl p-4 mb-3 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>

        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full bg-transparent outline-none"
          placeholder="Pickup"
        />
      </div>

      {/* Destination */}
      <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>

        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full bg-transparent outline-none"
          placeholder="Where are you going?"
        />
      </div>

      {destination && (
        <div className="mt-4 bg-white rounded-xl border overflow-hidden">
          {filteredSuggestions.map((location) => (
            <div
              key={location}
              onClick={() => selectLocation(location)}
              className="p-4 border-b cursor-pointer hover:bg-gray-100"
            >
              📍 {location}
            </div>
          ))}
        </div>
      )}

      <button className="w-full mt-5 bg-black text-white py-4 rounded-xl font-semibold">
        Search Ride
      </button>
    </div>
  );
};

export default SearchBox;