import React from 'react';
import Tweet from './Tweet'



function Tweetlist(props) {
    const tweetItem = props.tweets.tweets.map(tweet => {
        return <Tweet highlightTweet={props.highlightTweet} showTweetLocation={props.showTweetLocation} tweet={tweet} key={tweet.id} highlightedTweet={props.highlightedTweet} />
    })

    return (
        <div className="Tweetlist">
            {tweetItem.length === 0 ? <h4>Sorry, we haven't found any tweets at this location</h4> : null}
            {tweetItem}
        </div>
    );
}

export default Tweetlist;
