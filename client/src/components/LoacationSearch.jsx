import React from "react";

const LocationSearch = ({ setDestination, setSuggestion,setIsExpanded }) => {
  const suggestions = [
    {
      id: 1,
      title: "Bhelupur",
      address: "Bhelupur, Varanasi, Uttar Pradesh",
    },
    {
      id: 2,
      title: "Lanka",
      address: "Lanka,  Varanasi, Uttar Pradesh",
    },
    {
      id: 3,
      title: "Rajatalab",
      address: "Near BHU, Varanasi, Uttar Pradesh",
    },
    {
      id: 4,
      title: "birbhanpur",
      address: " Varanasi, Uttar Pradesh",
    },
  ];

  return (
    <div className="p-4 scroll ">
      {suggestions.map((location) => (
        <div
          key={location.id}
          onClick={() => {
            setDestination(location.title);
            setSuggestion(false);
             setIsExpanded(false) //there for down
          }}
          className="flex items-center gap-x-1.5 p-3 mt-2 ml-0 cursor-pointer border-1 border-b-gray-400 rounded-2xl hover:bg-gray-100"
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