const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export const getReadableTime = (timestamp) => {
    const parsedTimestamp = new Date(timestamp)
    const readableDate = `${parsedTimestamp.getDate()} ${months[parsedTimestamp.getMonth()]} ${parsedTimestamp.getFullYear()}`
    return readableDate
}

export const getImage = (tweet) => {
    if (tweet.entities.media) {
        const tweetImage = tweet.entities.media.filter(media => {
            return media.type === "photo"
        })[0].media_url
        return tweetImage;
    }
}

export const getGeoByPlace = (tweetsArray) => {
    tweetsArray.forEach(tweet => {
        const coordsArray = tweet.place.bounding_box.coordinates[0]
        const avgLng = (coordsArray[0][0] + coordsArray[1][0] + coordsArray[2][0] + coordsArray[3][0]) / 4;
        const avgLat = (coordsArray[0][1] + coordsArray[1][1] + coordsArray[2][1] + coordsArray[3][1]) / 4;
        tweet.geo = { coordinates: [avgLat, avgLng] }
    });
    return tweetsArray
}