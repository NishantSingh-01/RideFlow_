import React from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import Map from '../components/Map'
import { MapPin } from "lucide-react";

const ConfirmRide = () => {
    const socket = useContext(SocketContext)
    const [searchParams] = useSearchParams()
    const pickup = searchParams.get('pickup')
    const destination = searchParams.get('destination')

    const [confirmedRide, setConfirmedRide] = React.useState(null)

    useEffect(() => {
        socket.on("ride-confirmed", (data) => {
            console.log("Ride confirmed:", data)
            setConfirmedRide(data)
        })

        return () => {
            socket.off("ride-confirmed");
        }
    }, [socket])


    return (
        <div>
            <div className='flex flex-col h-full w-full gap-4  md:flex-row-reverse md:justify-around md:gap-10'>yyy
                <div className='flex md:mt-20 mt-7 flex-col items-center justify-center  md:flex-row-reverse md:justify-around md:gap-10'>
                    <div className='h-[50vh] w-full  overflow-x-hidden md:h-[490px] md:w-[950px] shadow-xl rounded-lg overflow-hidden relative z-0'>
                        <Map />
                    </div>
                    <div className='  w-full h-[39vh] rounded-xl md:w-[500px]  p-4 rounded-lg '>
                        {confirmedRide ? (
                            <div className="bg-white p-6 rounded-3xl shadow-2xl border w-full md:w-1/2">
                                <h3 className="text-xl font-semibold mb-5">Ride Confirmed!</h3>
                                <p className="text-lg">Your ride from <span className="font-semibold">{confirmedRide.pickup}</span> to <span className="font-semibold">{confirmedRide.destination}</span> has been confirmed.</p>
                                <p className="text-lg">Captain: <span className="font-semibold">{confirmedRide.captain_firstname} {confirmedRide.Captain_lastName}</span></p>
                                <p className="text-lg">Vehicle NO: <span className="font-semibold">{confirmedRide.vehicle_plate
                                }</span></p>
                                <p className="text-lg">Fare: <span className="font-semibold">${confirmedRide.fare}</span></p>
                                <p className="text-lg">Please wait for your captain to arrive.</p>
                            </div>
                        ) : (
                            <div className="bg-white p-6 rounded-3xl shadow-2xl border w-full md:w-1/2">
                                <h3 className="text-xl font-semibold mb-5">Confirming Ride...</h3>
                                <p className="text-lg">Please wait while we confirm your ride.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRide

