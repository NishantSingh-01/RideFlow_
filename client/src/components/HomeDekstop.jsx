import React from 'react'
import LocationSearch from '../components/LoacationSearch'
import Map from '../components/Map'
import Footer from './Footer'
import BusinessSection from './BusinessSection'

const HomeDesktop = ({
    pickup,
    setPickup,
    destination,
    setDestination,
    isSuggestion,
    setSuggestion,
}) => {
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
                                    value={pickup}
                                    onFocus={() => setIsExpanded(true)}
                                    onChange={(e) => setPickup(e.target.value)}
                                    className="w-full bg-transparent outline-none"
                                    placeholder="Pickup"
                                />
                            </div>

                            <div className="bg-gray-100 rounded-xl p-5 flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>

                                <input
                                    type="text"
                                    value={destination}
                                    onFocus={() => {
                                        setIsExpanded(true);
                                        setSuggestion(true);
                                    }}
                                    onChange={(e) => {
                                        setDestination(e.target.value)
                                        setIsExpanded(true);
                                        setSuggestion(true);
                                    }}
                                    className="w-full bg-transparent outline-none"
                                    placeholder="Where are you going?"
                                />
                            </div>
                            <button
                                className="w-full mt-5 bg-gray-900 text-white rounded-xl py-4 font-medium hover:bg-black transition"
                            >
                                Search Ride
                            </button>

                            {/* {isSuggestion && (
                            <LocationSearch
                                setDestination={setDestination}
                                setSuggestion={setSuggestion}
                            />
                        )} */}
                        </div>
                    </div>
                </div>
                <div className='border-2  border-amber-100 rounded-e-lg h-[490px] overflow-hidden  relative z-0" w-[750px]'>
                    <Map />
                </div>


            </div>
                      <hr className="my-14 border-gray-100" />
            <BusinessSection/>
            <Footer showOnMobile={false} />
        </>
    )
}

export default HomeDesktop