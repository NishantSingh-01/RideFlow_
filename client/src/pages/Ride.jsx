import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, Car, Clock, Navigation2 } from "lucide-react";
import NormalNavbar from "../components/NormalNavbar";
import RideMap from "../components/RideMap";
import { CaptainContext } from "../Context/CaptainContext";
import { RideProvider } from "../Context/RideContext";

const Ride = () => {
    const { rideId } = useParams();
    const { captain } = useContext(CaptainContext);

    const [rideInfo, setRideInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token") || localStorage.getItem("Captaintoken");

    useEffect(() => {
        if (!rideId) return;

        const fetchRideInfo = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(`${import.meta.env.VITE_API_URL}/ride/${rideId}/info`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setRideInfo(res.data?.data || null);
            } catch (e) {
                setError(e?.response?.data?.message || "Failed to load ride info");
            } finally {
                setLoading(false);
            }
        };

        fetchRideInfo();
    }, [rideId, token]);

    const pickup = useMemo(() => rideInfo?.pickup || "", [rideInfo]);
    const destination = useMemo(() => rideInfo?.destination || "", [rideInfo]);

    return (
        <RideProvider>
            <div className="flex flex-col h-full w-full gap-4 md:flex-row-reverse md:justify-around md:gap-10">
                <NormalNavbar />

                <div className="flex md:mt-20 mt-7 flex-col items-center justify-center md:flex-row-reverse md:justify-around md:gap-10">
                    <div className="h-[50vh] w-full overflow-x-hidden md:h-[490px] md:w-[950px] shadow-xl rounded-lg overflow-hidden relative z-0">
                        {/* Shows pickup -> destination route (distance/duration handled in RideMap via /maps/route) */}
                        {pickup && destination ? <RideMap pickup={pickup} destination={destination} /> : null}
                    </div>

                    <div className="w-full h-auto md:w-[500px] p-4 rounded-lg">
                        <h1 className="text-xl font-bold font-mono md:text-3xl flex items-center gap-2">
                            <Navigation2 className="w-6 h-6 text-blue-600" />
                            Ride details
                        </h1>

                        {loading ? (
                            <p className="text-sm mt-4 text-gray-600">Loading...</p>
                        ) : error ? (
                            <p className="text-sm mt-4 text-red-600">{error}</p>
                        ) : rideInfo ? (
                            <div className="mt-4 flex flex-col gap-3">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <MapPin className="w-5 h-5 text-green-600" />
                                        Pickup
                                    </div>
                                    <div className="mt-2 text-sm text-gray-700">{rideInfo.pickup}</div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                        Destination
                                    </div>
                                    <div className="mt-2 text-sm text-gray-700">{rideInfo.destination}</div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <Clock className="w-5 h-5 text-gray-700" />
                                        {"Route (pickup -> destination)"}
                                    </div>
                                    <div className="mt-2 text-sm text-gray-700">
                                        {/* RideMap already fetches distance/duration and stores in RideContext.
                        If you also want to show them here, wire RideContext inside this component. */}
                                        Distance and duration will be calculated from the route.
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <Car className="w-5 h-5 text-gray-700" />
                                        Captain
                                    </div>
                                    <div className="mt-2 text-sm text-gray-700">
                                        {rideInfo?.captain_firstname || captain?.firstname || ""} {rideInfo?.captain_lastname || captain?.lastname || ""}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">Captain location will be shown on Map component via sockets.</div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm mt-4 text-gray-600">No ride info found.</p>
                        )}
                    </div>
                </div>
            </div>
        </RideProvider>
    );
};

export default Ride;

