import React from 'react';
import Tweet from './Tweet'



function Tweetlist(props) {
    const tweetItem = props.tweets.tweets.map(tweet => {
        return <Tweet highlightTweet={props.highlightTweet} showTweetLocation={props.showTweetLocation} tweet={tweet} key={tweet.id} />
    })

    return (
        <div className="Tweetlist">
            <h4>Tweets near you</h4>
            {tweetItem}
        </div>
    );
}

export default Tweetlist;
