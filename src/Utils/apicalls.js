import { getGeoByPlace } from './utils'

const geoApiKey = 'd4749ab0cd4841ce85970147b0337e76'


export const requestTweets = async (lat, lng) => {

    const res = await fetch(`https://us-central1-node-server-78be8.cloudfunctions.net/getTweets?lat=${lat}&lng=${lng}&radius=2`)
    const data = await res.json()

    const filteredData = data.statuses.filter(tweet => {
        return tweet.geo !== null;
    })

    const salvagedTweets = getGeoByPlace(data.statuses.filter(tweet => {
        return tweet.geo === null && tweet.place !== null;
    }))

    const combinedData = filteredData.concat(salvagedTweets)

    combinedData.sort((a, b) => {
        return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
    })

    return combinedData;
}

//Need to fix error for invalid search query
export const getCoordsFromQuery = async (query) => {
    try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${geoApiKey}&language=en&pretty=1`);
        const data = await response.json()
        const coordsObject = {
            lat: data.results[0].geometry.lat,
            lng: data.results[0].geometry.lng
        }
        return coordsObject
    } catch (err) {
        return {
            lat: 52.379189,
            lng: 4.899431
        }
    }
}