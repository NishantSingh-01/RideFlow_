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