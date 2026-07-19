import * as MapServices from '..//services/map.service.js'
import * as RideRepository from '../repositories/ride.repositories.js'
import crypto from 'crypto'
import ApiError from '../utils/apierror.js';

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}
export const calculateFare = (distance, duration, precision = 0) => {
    const baseFare = {
        auto: 30,
        bike: 20,
        car: 50,
    }
    const perKmRate = {
        auto: 10,
        bike: 8,
        car: 15,
    }
    const perMinuteRate = {
        auto: 2,
        bike: 1,
        car: 3,
    }

    const round = (num) => (precision === 0 ? Math.round(num) : Number(num.toFixed(precision)))

    return {
        auto: round(
            baseFare.auto +
            (distance / 1000) * perKmRate.auto +
            (duration / 60) * perMinuteRate.auto
        ),

        bike: round(
            baseFare.bike +
            (distance / 1000) * perKmRate.bike +
            (duration / 60) * perMinuteRate.bike
        ),

        car: round(
            baseFare.car +
            (distance / 1000) * perKmRate.car +
            (duration / 60) * perMinuteRate.car
        ),
    }
}

export const createRide = async ({ userId, pickup, destination, vehicleType }) => {
    const distanceTime = await MapServices.getDistanceTime(
        pickup,
        destination
    )
    const fares = calculateFare(
        distanceTime.distance,
        distanceTime.duration
    )
    const fare = fares[vehicleType]
    if (!fare) {
        throw new ApiError(400, "Invalid vehicle type");
    }
    return await RideRepository.createRide({
        userId,
        pickup,
        destination,
        vehicleType,
        fare,
        distance: distanceTime.distance,
        duration: distanceTime.duration,
        otp: getOtp(4),
    })

}


export const changeStatus = async (rideId, status, captainId) => {

    if (!rideId) {
        throw new ApiError(400, "Ride ID is required")
    }
    await RideRepository.changeStatus(rideId, status, captainId)

    const ride = await RideRepository.getRideWithUserAndCaptain(rideId)

    return ride

}

export const startRide = async (rideId, captainId, otp) => {
    if (!otp) {
        throw new ApiError(400, "OTP are required")
    }
    const ride = await RideRepository.getRideDetails(rideId)

    if (!ride) {
        throw new ApiError(404, "Ride not found");
    }

    if (ride.captain_id !== captainId) {
        throw new ApiError(403, "You are not assigned to this ride");
    }

    if (ride.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }
    const rideStatusChange = await changeStatus(rideId, "ongoing", captainId)
    return rideStatusChange
}

export const getRideDetails = async (rideId) => {

    const ride = await RideRepository.getRideDetails(rideId)

    if (!ride) {
        throw new ApiError(404, "Ride not found")
    }
    return ride
}
export const endRide = async (rideId, captainId) => {
    if (!rideId || !captainId) {
        throw new ApiError(400, "Ride ID and Captain ID are required")
    }
    const ride = await RideRepository.getRideDetails(rideId)
    console.log("1", ride)
    if (!ride) {
        throw new ApiError(404, "Ride not found");
    }
    if (ride.captain_id !== captainId) {
        throw new ApiError(403, "Unauthorized");
    }

    if (ride.status !== "ongoing") {
        throw new ApiError(400, "Ride is not ongoing");
    }
    const rideStatusChange = await changeStatus(rideId, "completed", captainId)
    return rideStatusChange
}

export const cancelRide = async (rideId, cancelledBy) => {
    if (!rideId || !cancelledBy) {
        throw new ApiError(400, "Ride ID and cancelledBy are required")
    }
    const ride = await RideRepository.getRideById(rideId);
    if (!ride) {
        throw new ApiError(404, "Ride not found");
    }

    if (ride.status === "completed") {
        throw new ApiError(
            400,
            "Completed ride cannot be cancelled"
        )
    }

    if (ride.status === "cancelled") {
        throw new ApiError(
            400,
            "Ride already cancelled"
        );
    }

    await RideRepository.cancelRide(
        rideId,
        cancelledBy
    )

    return await RideRepository.getRideWithUserAndCaptain(
        rideId
    )

}