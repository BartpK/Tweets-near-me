import React from 'react';
import Tweetlist from './Tweetlist'
import SearchBar from './SearchBar'



function Aside(props) {

    return (
        <div className="Aside">
            <div className="asideheader">
                <h1>Tweets near me</h1>
                <p>Use the <i className="fas fa-crosshairs"></i> below to find tweets within a 2km radius of your location or search for addresses, place names, or landmarks using the search bar. You can also drag the map to search.</p>
            </div>
            <SearchBar searchByLocation={props.searchByLocation} getTweetsNearMe={props.getTweetsNearMe} />

            {props.tweets.tweets ? <Tweetlist highlightTweet={props.highlightTweet} tweets={props.tweets} highlightedTweet={props.highlightedTweet} /> : null}
        </div>
    );
}

export default Aside;
