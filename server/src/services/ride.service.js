import * as MapServices from '..//services/map.service.js'
import * as RideRepository from '../repositories/ride.repositories.js'
import crypto from 'crypto'

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
        otp: getOtp(4),
        distance: distanceTime.distance,
        duration: distanceTime.duration,
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
export const ArrivedatPickup = async (rideId, status) => {
    if (!rideId) {
        throw new ApiError(400, "Ride ID is required")
    }
}
export const startRide = async (rideId, status) => {

    if (!rideId) {
        throw new ApiError(400, "Ride ID is required")
    }
}

export const endRide = async (rideId, status) => {
    if (!rideId) {
        throw new ApiError(400, "Ride ID is required")
    }
}