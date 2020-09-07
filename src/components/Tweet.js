import React from 'react';
import { getReadableTime, getImage } from '../Utils/utils'


function Tweet(props) {
    const highlightClass = props.highlightedTweet === props.tweet.id ? "highlightedtweet" : null;

    return (
        <div id={props.tweet.id} className={`tweetcard ${highlightClass}`} onMouseEnter={() => props.highlightTweet(props.tweet.id)}>
            <div className="tweetwrapper">
                <div className="tweetheader">
                    <img className="tweetprofilepic" src={props.tweet.user.profile_image_url} alt={props.tweet.user.name} />
                    <h3 className="username">{props.tweet.user.name}</h3>
                    <p className="userhandle">@{props.tweet.user.screen_name}</p>
                </div>
                <p className="tweetcontent">{props.tweet.full_text}</p>
                {getImage(props.tweet) ? <img className="tweetphoto" src={getImage(props.tweet)} alt={getImage(props.tweet)} /> : null}
                <a className="tweeturl" href={`https://twitter.com/${props.tweet.user.screen_name}/status/${props.tweet.id_str}`} target="_blank" rel="noopener noreferrer">View on twitter</a>
                <p className="tweetdate">{getReadableTime(props.tweet.created_at)}</p>
            </div>
        </div >
    );
}

export default Tweet;