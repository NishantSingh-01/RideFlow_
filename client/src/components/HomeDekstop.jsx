import React, { useContext } from 'react'
import LocationSearch from '../components/LoacationSearch'
import Map from '../components/Map'
import Footer from './Footer'
import BusinessSection from './BusinessSection'
import { useNavigate } from 'react-router-dom'
import RideContext from '../Context/RideContext'
import { toast } from 'react-toastify'

const HomeDesktop = ({
    pickup,
    setPickup,
    destination,
    setDestination,
    isSuggestion,
    setSuggestion,
    setIsExpanded
}) => {
    const navigate = useNavigate()
    const { rideData, setRideData } = useContext(RideContext)
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
        //     const token = localStorage.getItem("token")
        //     if(!token){
        //          toast.error("Please Login first")
        //          return
        //     }
        //     await axios.get(
        //         `${import.meta.env.VITE_API_URL}/maps/route`,
        //         {
        //             params: {
        //                 pickup,
        //                 destination,
        //             },
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         }
        //     )

        //     navigate(
        //         `/select-vehicle?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`
        //     )
        // } catch (error) {
        //     toast.error("Please enter valid locations")
        // }
        navigate(
            `/select-vehicle?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`
        )
        setPickup('')
        setDestination('')
    }
    return (
        <>
            <div className='max:hidden h-[95px] border-4 rounded-2xl border-l-gray-900 w-0 absolute top-90 left-145 ' ></div>
            <div className="hidden md:flex min-h-screen flex-col-reverse md:gap-2 md:flex-row md:justify-between items-start px-8 md:px-20 pt-32 max-md:pt-25">
                <div className="max-w-xl text-center md:text-left">
                    <h1 className="text-3xl md:text-6xl pl-5 font-bold font-mono ">
                        {/* <i className="fa-solid fa-location-dot text-5xl"></i>*/}Go anywhere with
                    </h1>
                    <h1 className='text-6xl font-bold mt-5 pl-5  font-mono max-md:text-5xl'>RideFlow ...</h1>
                    <div>
                        <div className="p-5 mt-11">

                            <div className="bg-gray-100 rounded-xl p-5 mb-4 flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>

                                <input
                                    type="text"
                                    required
                                    value={pickup}
                                    onFocus={() => setIsExpanded(true)}
                                    onChange={(e) => {
                                        setPickup(e.target.value);
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

                            <div className="bg-gray-100 rounded-xl p-5 flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>

                                <input
                                    type="text"
                                    required
                                    value={destination}
                                    onFocus={() => {
                                        setIsExpanded(true);
                                        setSuggestion(true);
                                    }}
                                    onChange={(e) => {
                                        setDestination(e.target.value)
                                        setIsExpanded(true);
                                        setSuggestion(true);
                                        setRideData({
                                            ...rideData,
                                            destination: e.target.value,
                                        })
                                    }}
                                    className="w-full bg-transparent outline-none"
                                    placeholder="Where are you going?"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="w-full mt-5 bg-gray-900 text-white rounded-xl py-4 font-medium hover:bg-black transition"
                            >
                                Search Ride
                            </button>

                            <div
                                className='relative'>
                                {isSuggestion && destination.trim() && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-72 overflow-y-auto">
                                        <LocationSearch
                                            setDestination={setDestination}
                                            setSuggestion={setSuggestion}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-2 shadow-xl border-gray-100 rounded-lg h-[490px] overflow-hidden  relative z-0" w-[770px]'>
                    <Map />
                </div>


            </div>
            <hr className="my-14 border-gray-100" />
            <BusinessSection />
            <Footer showOnMobile={false} />
        </>
    )
}

export default HomeDesktop