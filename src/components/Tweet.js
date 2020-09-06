import React from 'react';



function Tweet(props) {
    const [lat, lon] = props.tweet.geo.coordinates;

    return (
        <div className='tweetcard' onClick={() => props.showTweetLocation(lat, lon)} onMouseEnter={() => props.highlightTweet(props.tweet.id)}>
            <div className="tweetwrapper">
                <h3 className="username">{props.tweet.user.name}</h3>
                <p className="userhandle">@{props.tweet.user.screen_name}</p>
                <p className="tweetcontent">{props.tweet.text}</p>
            </div>
        </div>
    );
}

export default Tweet;