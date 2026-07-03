import React from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'


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
        <div className="flex flex-col md:flex-row-reverse md:mt-10 md:justify-center md:gap-15 flex-1">
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
    )
}

export default ConfirmRide
