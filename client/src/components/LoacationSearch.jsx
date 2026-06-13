import React from "react";

const LocationSearch = ({ setDestination, setSuggestion }) => {
  const suggestions = [
    {
      id: 1,
      title: "Bhelupur",
      address: "Bhelupur, Varanasi, Uttar Pradesh",
    },
    {
      id: 2,
      title: "Lanka",
      address: "Lanka, Near BHU, Varanasi, Uttar Pradesh",
    },
  ];

  return (
    <div className="p-4">
      {suggestions.map((location) => (
        <div
          key={location.id}
          onClick={() => {
            setDestination(location.title);
            setSuggestion(false);
          }}
          className="flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
            <i className="fa-solid fa-location-dot text-xl"></i>
          </div>

          <div>
            <h3 className="font-medium">{location.title}</h3>
            <p className="text-sm text-gray-500">
              {location.address}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearch;