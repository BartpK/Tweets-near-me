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