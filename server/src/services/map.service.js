import axios from 'axios'
import ApiError from '../utils/apierror.js'


export const getAddressCoordinates = async (address) => {
    if (!address) {
        throw new ApiError(404, "pls provide Address ")
    }
    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: address,
                format: "json",
                limit: 1,
            },
            headers: {
                "User-Agent": process.env.NOMINATIM_USER_AGENT,
                "Accept-Language": process.env.NOMINATIM_LANGUAGE,
            },
            timeout: 5000,
        }
    )
    const location = response.data[0];
    return {
        lat: Number(location.lat),
        lng: Number(location.lon),
    }
}

export const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new ApiError(
            400,
            "Origin and destination are required"
        )
    }
    const pickup = await getAddressCoordinates(origin)
    const drop = await getAddressCoordinates(destination)

    const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}`,
        {
            params: {
                overview: "false"
            }
        }
    )
    if (!response.data.routes || response.data.routes.length === 0) {
        throw new ApiError(
            404,
            "Route not found"
        )
    }
    const route = response.data.routes[0]
    return {
        distance: Math.round(route.distance),
        duration: Math.round(route.duration),

        distanceText: `${Math.round(
            route.distance / 1000
        )} km`,

        durationText: `${Math.ceil(
            route.duration / 60
        )} mins`
    };
}

export const getRoute = async (origin, destination) => {
    if (!origin || !destination) {
        throw new ApiError(
            400,
            "Origin and destination are required"
        );
    }

    const pickup = await getAddressCoordinates(origin)
    const drop = await getAddressCoordinates(destination)

    const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}`,
        {
            params: {
                overview: "full",
                geometries: "geojson",
            },
        }
    )
    if (!response.data.routes || response.data.routes.length === 0) {
        throw new ApiError(
            404,
            "Route not found"
        )
    }
    const route = response.data.routes[0]
    return {
        distance: route.distance,
        duration: route.duration,
        geometry:
            route.geometry.coordinates,
    }
}

export const getSuggestions = async (query) => {

    const response = await axios.get(
        "https://photon.komoot.io/api",
        {
            params: {
                q: query,
                limit: 6,
                osm_tag: "place",
                countrycode: "IN"
            },
        }
    )
    return response.data.features.map((place) => ({
        name: place.properties.name,
        city: place.properties.city,
        state: place.properties.state,
        // country: place.properties.country,
        // latitude: place.geometry.coordinates[1],
        // longitude: place.geometry.coordinates[0],
    }))
} 
