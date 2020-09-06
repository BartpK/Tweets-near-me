import React, { useState, useEffect } from 'react';
import Aside from './components/Aside.js'
import { requestTweets, getCoordsFromQuery } from './Utils/apicalls'
import Map from './components/Map'


import './App.css';



function App() {

  const [tweets, setTweets] = useState({ tweets: [] });
  const [mapLocation, setMapLocation] = useState({
    lat: 37.42216,
    lng: -123.08427,
  })

  const [showAreaSearchButton, setShowAreaSearchButton] = useState(false);

  const [dragLocation, setDragLocation] = useState({})

  const [tweetLocation, setTweetLocation] = useState({
    lat: 37.42216,
    lng: -122.08427,
  })

  const toggleAreaSearchButton = (dragLocation) => {
    if ((mapLocation.lat - dragLocation.lat >= 0.02 || mapLocation.lat - dragLocation.lat <= -0.02) || (mapLocation.lng - dragLocation.lng >= 0.04 || mapLocation.lng - dragLocation.lng <= -0.04)) {
      setShowAreaSearchButton(true)
    } else {
      setShowAreaSearchButton(false)
    }
  }

  const checkDragLocation = (e) => {
    const dragLocation = {
      lat: e.center.lat(),
      lng: e.center.lng()
    }
    //check if difference is large enough to show button

    setDragLocation(dragLocation)
    toggleAreaSearchButton(dragLocation)
  }

  const [highlightedTweet, setHighlightedTweet] = useState("")

  const highlightTweet = (id) => {
    setHighlightedTweet(id)
  }

  const showTweetLocation = (lat, lon) => {
    setTweetLocation({
      lat: lat,
      lng: lon
    })
  }

  const searchByLocation = async (query) => {
    const coords = await getCoordsFromQuery(query)
    getTweetsBySearch(coords);
  }

  const getTweetsBySearch = async (coords) => {
    const lat = coords.latitude;
    const lon = coords.longitude;
    const tweetData = await requestTweets(lat, lon);
    setTweets({
      tweets: tweetData
    })
    setMapLocation({
      lat: lat,
      lng: lon
    })
  }

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(getTweets);
  }

  const getTweets = async (rawCoords) => {
    const lat = rawCoords.coords.latitude;
    const lon = rawCoords.coords.longitude;
    const tweetData = await requestTweets(lat, lon);
    setTweets({
      tweets: tweetData
    })
    setMapLocation({
      lat: lat,
      lng: lon
    })
  }

  const getTweetsByDrag = async () => {
    const lat = dragLocation.lat;
    const lon = dragLocation.lng;
    const tweetData = await requestTweets(lat, lon);
    setTweets({
      tweets: tweetData
    })
    setMapLocation({
      lat: lat,
      lng: lon
    })
    setShowAreaSearchButton(false)
  }

  const getTweetsNearMe = async () => {
    getUserLocation();
  }

  useEffect(() => {
    getUserLocation();
    showTweetLocation(52.0696583, 5.1189593)
  }, [])

  console.log(showAreaSearchButton)

  return (
    <div className="App">
      <Aside searchByLocation={searchByLocation} showTweetLocation={showTweetLocation} getTweetsNearMe={getTweetsNearMe} tweets={tweets} highlightTweet={highlightTweet} />
      <Map center={mapLocation} location={mapLocation} zoomLevel={13} tweets={tweets} highlightedTweet={highlightedTweet} checkDragLocation={checkDragLocation} showAreaSearchButton={showAreaSearchButton} getTweetsByDrag={getTweetsByDrag} />
    </div>
  );
}

export default App;
