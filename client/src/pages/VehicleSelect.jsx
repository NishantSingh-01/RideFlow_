import React, { useContext, useEffect, useState } from 'react'
import Map from '../components/Map'
import Navbar from '../components/Navbar'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RideContext from '../Context/RideContext'
import axios from 'axios'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import RideMap from '../components/RideMap'

const VehicleSelect = () => {
    const vehicles = [
        {
            id: 1,
            type: "Car",
            fareKey: "car",
            description: "Comfortable ride",
            image:
                "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png"
        },
        {
            id: 2,
            type: "Auto",
            fareKey: "auto",
            description: "Affordable option",
            image:
                "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png"
        },
        {
            id: 3,
            type: "Bike",
            fareKey: "bike",
            description: "Fastest option",
            image:
                "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Regular/MotorcycleOrange-249-0.png"
        },
    ]
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const pickup = searchParams.get('pickup')
    const destination = searchParams.get('destination')

    const { rideData, setRideData } = useContext(RideContext)
    const [loading, setLoading] = useState(true)
    const [selectedVehicle, setSelectedVehicle] = useState(null)


    const createRide = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token')

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/ride/create`,
                {
                    pickup,
                    destination,
                    vehicleType: selectedVehicle
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log(response)

            // const rideId = response.data.data._id 
            // setRideData(prev => ({ ...prev, rideId }))   
            toast.success("Ride Requested")
            navigate(`/request-ride`, { replace: true })

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        const getFare = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem('token')

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/ride/fare`,
                    {
                        params: {
                            pickup,
                            destination,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                const data = response.data.data

                setRideData(prev => ({
                    ...prev,
                    pickup,
                    destination,
                    fare: response.data.data.Price
                }))
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Something went wrong"
                )
                console.log(error.response?.data)
                console.log(error.response?.status)
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        if (pickup && destination) {
            getFare()
        }

    }, [pickup, destination, setRideData])

    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className="h-screen flex flex-col">

                <div className="hidden md:block text-5xl text-gray-700 font-semibold mt-3 m text-center">
                    Choose a Mode To Travel
                </div>

                <div className="flex flex-col md:flex-row-reverse md:mt-10 md:justify-center md:gap-15 flex-1">

                    <div className="h-[47vh] rounded-b-2xl md:mt-7 md:h-[490px] md:w-[750px] border-2 border-blue-100 shadow-xl rounded-lg overflow-hidden relative z-0">
                        <RideMap
                            pickup={rideData.pickup}
                            destination={rideData.destination}
                        />
                    </div>


                    <div className="h-[53vh] md:h-[560px] md:w-[550px] p-4 rounded-t-4xl md:rounded-none overflow-y-auto">

                        <h2 className="text-2xl md:text-3xl  indent-1.5 pl-1 flex items-center font-semibold mb-1">
                            <img
                                className="h-14 w-14 md:h-17 md:w-17"
                                src="data:image/png;base64,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"
                                alt=""
                            />
                            Select a Vehicle
                        </h2>

                        <div className="flex items-center gap-2 mb-3">
                            <img
                                className="h-10 w-10 md:h-16 md:w-17"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN6Y0wQThuzXcQuB05SPmhtRoG25NvrJvWWg&s"
                                alt=""
                            />

                            <h1 className="text-lg md:text-2xl font-semibold text-gray-600 ">
                                Total Distance :
                                <span className="font-mono">
                                    {" "}
                                    {(rideData.distance / 1000).toFixed(1)} Km
                                </span>
                            </h1>
                        </div>


                        <div className="space-y-3 md:space-y-4">
                            {vehicles.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    onClick={() => setSelectedVehicle(vehicle.fareKey)}
                                    className={`flex mt-5 items-center gap-3 md:gap-4 p-3 md:p-4 border-2 rounded-2xl cursor-pointer transition
                                                  ${selectedVehicle === vehicle.fareKey
                                            ? 'border-black bg-gray-100'
                                            : 'hover:bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    <img
                                        src={vehicle.image}
                                        alt={vehicle.type}
                                        className="h-14 w-14 md:h-22 md:w-22 object-contain"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-base md:text-lg">
                                            {vehicle.type}
                                        </h3>
                                        <p className="text-xs md:text-sm text-gray-500">
                                            {vehicle.description}
                                        </p>
                                    </div>

                                    <p className="text-base md:text-lg font-bold">
                                        ₹{rideData.fare?.[vehicle.fareKey] || 0}
                                    </p>
                                </div>
                            ))}

                            {selectedVehicle && (
                                <button
                                    onClick={() => {
                                        setRideData(prev => ({ ...prev, vehicleType: selectedVehicle }))
                                    }}
                                    onClick={createRide}
                                    className="w-full mt-2 py-3 bg-black text-white font-semibold rounded-2xl hover:bg-gray-800 transition"
                                >
                                    {loading ? 'Requesting Ride ..' : 'Request Ride'}
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default VehicleSelect