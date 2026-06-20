
export const calculateFare = (distance, duration) => {
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

    return {
        auto: Math.round(
            baseFare.auto +
            (distance / 1000) * perKmRate.auto +
            (duration / 60) * perMinuteRate.auto
        ),

        bike: Math.round(
            baseFare.bike +
            (distance / 1000) * perKmRate.bike +
            (duration / 60) * perMinuteRate.bike
        ),

        car: Math.round(
            baseFare.car +
            (distance / 1000) * perKmRate.car +
            (duration / 60) * perMinuteRate.car
        ),
    }
}

