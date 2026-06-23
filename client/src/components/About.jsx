import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
    return (
        <>
            <Navbar />

            <div className="min-h-screen pt-25 px-5 mb-5 md:px-20">

                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-7xl font-bold font-mono">
                        About RideFlow
                    </h1>

                    <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                        RideFlow is a modern ride-booking platform designed to make
                        transportation simple, reliable, and accessible. Whether you're
                        commuting to work, heading to the airport, or exploring a new city,
                        RideFlow helps you reach your destination quickly and safely.
                    </p>
                </div>


                <div className="mt-12 text-center grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-4xl font-bold mb-5">
                            Our Mission
                        </h2>

                        <p className="text-gray-600 text-lg leading-relaxed">
                            We aim to transform urban mobility by connecting riders and
                            drivers through smart technology. Our goal is to provide
                            affordable, safe, and efficient transportation solutions that
                            improve everyday travel experiences.
                        </p>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1519003722824-194d4455a60c"
                        alt="Mission"
                        className="rounded-3xl shadow-xl w-full h-[350px] object-cover"
                    />
                </div>


                <div className="mt-12">
                    <h2 className="text-4xl font-bold text-center mb-8">
                        Why Choose RideFlow?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="p-8 rounded-3xl shadow-lg border">
                            <div className="text-4xl mb-4"><img className='h-13' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_Q5Up1RhNWb2d40QBPHLsSzqWJLc73eBun8h118f9Q&s" alt="" /></div>
                            <h3 className="text-2xl font-semibold mb-3">
                                Easy Booking
                            </h3>
                            <p className="text-gray-600">
                                Book rides instantly with a simple and intuitive interface.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl shadow-lg border">
                            <div className="text-4xl mb-4"><img className='h-13' src="https://png.pngtree.com/png-vector/20191024/ourmid/pngtree-military-shield-icon-simple-style-png-image_1852722.jpg" alt="" /></div>
                            <h3 className="text-2xl font-semibold mb-3">
                                Safe Travel
                            </h3>
                            <p className="text-gray-600">
                                Verified drivers and secure ride tracking for peace of mind.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl shadow-lg border">
                            <div className="text-4xl mb-4"><img className='h-13' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAU_vaMsYPbm34FQkQ8Kew4aPzjh6U-o5Qa4EfnSER7A&s" alt="" /></div>
                            <h3 className="text-2xl font-semibold mb-3">
                                Fast & Reliable
                            </h3>
                            <p className="text-gray-600">
                                Real-time updates, quick pickups, and dependable service.
                            </p>
                        </div>

                    </div>
                </div>

              
                <div className="mt-12 bg-black text-white rounded-3xl p-10">

                    <h2 className="text-4xl font-bold text-center mb-12">
                        RideFlow at a Glance
                    </h2>

                    <div className="grid md:grid-cols-4 gap-5 text-center">

                        <div>
                            <h3 className="text-5xl font-bold">10K+</h3>
                            <p className="mt-2 text-gray-300">Happy Riders</p>
                        </div>

                        <div>
                            <h3 className="text-5xl font-bold">2K+</h3>
                            <p className="mt-2 text-gray-300">Active Drivers</p>
                        </div>

                        <div>
                            <h3 className="text-5xl font-bold">50+</h3>
                            <p className="mt-2 text-gray-300">Cities Served</p>
                        </div>

                        <div>
                            <h3 className="text-5xl font-bold">99%</h3>
                            <p className="mt-2 text-gray-300">Customer Satisfaction</p>
                        </div>

                    </div>
                </div>

            </div>
            <Footer showOnMobile={true} />
        </>
    )
}

export default About