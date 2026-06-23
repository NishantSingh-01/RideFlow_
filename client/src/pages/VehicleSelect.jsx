import React, { useContext, useEffect, useState } from 'react'
import Map from '../components/Map'
import Navbar from '../components/Navbar'
import { useSearchParams } from 'react-router-dom'
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
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgnZAj6HAm8T864KUn27LMk1BfUxiUgINK9jog2SEz0w&s",
        },
        {
            id: 2,
            type: "Auto",
            fareKey: "auto",
            description: "Affordable option",
            image:
                "https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-3-wheeler-vector-png-image_6699799.png",
        },
        {
            id: 3,
            type: "Bike",
            fareKey: "bike",
            description: "Fastest option",
            image:
                "https://cdn.bikedekho.com/processedimages/revolt-motors/rv-400/source/rv-40069cba261aa690.jpg?tr=w-360",
        },
    ]
    const [searchParams] = useSearchParams()

    const pickup = searchParams.get('pickup')
    const destination = searchParams.get('destination')

    const { rideData, setRideData } = useContext(RideContext)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getFare = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem('token')
                // console.log(token)
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
                // console.log(response)
                // console.log(response.data.data.Price)
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
    // console.log(rideData)

    if (loading) {
        return <Loader />
    }
    return (


        <>

            <div className="h-screen flex gap-8 mt- flex-col md:flex-row-reverse">

                {/* <Navbar/> */}
                {/* <div className="flex-1 border-2 border-b-amber-800 h-[50vh]">
                <Map />
            </div> */}
                <div className='border-2  border-amber-100 rounded-e-lg h-[490px] overflow-hidden  relative z-0" w-[750px]'>
                    <RideMap pickup={rideData.pickup} destination={rideData.destination} />
                </div>

                <div className="md:w-[400px]  p-4 rounded-t-3xl md:rounded-none  overflow-y-auto">

                    <h2 className="text-2xl font-semibold mb-6">
                        Choose a Mode
                    </h2>

                    <div className="space-y-4">
                        {vehicles.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className="flex items-center gap-4 p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition"
                            >
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.type}
                                    className="h-16 w-16 object-contain"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">
                                        {vehicle.type}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {vehicle.description}
                                    </p>
                                </div>

                                <p className="text-lg font-bold">
                                    ₹{rideData.fare?.[vehicle.fareKey] || 0}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default VehicleSelect