import React from 'react';
import GoogleMapReact from 'google-map-react'
import './map.css'
import LocationPin from './LocationPin'

const Map = ({ location, zoomLevel, tweets, highlightedTweet, checkDragLocation, showAreaSearchButton, getTweets, dragLocation, highlightTweet, setShowAreaSearchButton }) => {


    const locationPins = tweets.tweets.map(tweet => {
        return <LocationPin key={tweet.id} tweet={tweet} lat={tweet.geo.coordinates[0]} lng={tweet.geo.coordinates[1]} highlightedTweet={highlightedTweet} highlightTweet={highlightTweet} />
    })

    return (
        <div className="map">
            <div className='buttondiv'>
                {showAreaSearchButton ? <button className='searchareabutton' onClick={() => { getTweets(dragLocation); setShowAreaSearchButton(false) }}>Search this area</button> : null}
            </div>
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyA0CwD0tWVk8Ko72nMj6V6CJlwSNTtIJP0' }}
                    // defaultCenter={location}
                    defaultZoom={zoomLevel}
                    center={location}
                    onDragEnd={checkDragLocation}
                >
                    {tweets.tweets ? locationPins : null}
                </GoogleMapReact>
            </div>
        </div>
    )
}

export default Map;
