import React, { useState, useEffect } from 'react';
import Aside from './components/Aside.js'
import { requestTweets, getCoordsFromQuery } from './Utils/apicalls'
import Map from './components/Map'


import './App.css';



function App() {

  const [tweets, setTweets] = useState({ tweets: [] });
  const [mapLocation, setMapLocation] = useState({
    lat: 52.092876,
    lng: 5.104480,
  })

  const [showAreaSearchButton, setShowAreaSearchButton] = useState(false);

  const [dragLocation, setDragLocation] = useState({})

  const toggleAreaSearchButton = (dragLocation) => {
    if ((mapLocation.lat - dragLocation.lat >= 0.01 || mapLocation.lat - dragLocation.lat <= -0.01) || (mapLocation.lng - dragLocation.lng >= 0.02 || mapLocation.lng - dragLocation.lng <= -0.02)) {
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

  const highlightTweet = (id, hoverSource) => {
    setHighlightedTweet(id)
    if (hoverSource === 'LocationPin') {
      document.getElementById(`${id}`).scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

  }

  const searchByLocation = async (query) => {
    if (query !== 'Search by location') {
      const coords = await getCoordsFromQuery(query)
      getTweets(coords);
    }
  }

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((rawCoords) => {
      const coordsObject = {
        lat: rawCoords.coords.latitude,
        lng: rawCoords.coords.longitude
      }
      getTweets(coordsObject)
    });
  }


  // accepts object as param w/ lat, lng properties
  const getTweets = async (coordsObject) => {
    const { lat, lng } = coordsObject
    const tweetData = await requestTweets(lat, lng);
    setTweets({
      tweets: tweetData
    })
    setMapLocation({
      lat: lat,
      lng: lng
    })
  }






  const getTweetsNearMe = async () => {
    getUserLocation();
  }

  useEffect(() => {
    getUserLocation();
  }, [])


  return (
    <div className="App">
      <Aside searchByLocation={searchByLocation} getTweetsNearMe={getTweetsNearMe} tweets={tweets} highlightTweet={highlightTweet} highlightedTweet={highlightedTweet} />
      <Map center={mapLocation} location={mapLocation} zoomLevel={15} tweets={tweets} highlightedTweet={highlightedTweet} checkDragLocation={checkDragLocation} showAreaSearchButton={showAreaSearchButton} getTweets={getTweets} dragLocation={dragLocation} highlightTweet={highlightTweet} setShowAreaSearchButton={setShowAreaSearchButton} />
    </div>
  );
}

export default App;
