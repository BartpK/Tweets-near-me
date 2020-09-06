import React from 'react';
import Tweetlist from './Tweetlist'
import SearchBar from './SearchBar'



function Aside(props) {

    return (
        <div className="Aside">
            <h1>Aside component</h1>
            <SearchBar searchByLocation={props.searchByLocation} getTweetsNearMe={props.getTweetsNearMe} />
            {props.tweets.tweets ? <Tweetlist highlightTweet={props.highlightTweet} showTweetLocation={props.showTweetLocation} tweets={props.tweets} /> : null}
        </div>
    );
}

export default Aside;
