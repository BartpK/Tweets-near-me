import React from 'react';

function LocationPin(props) {
    const style = props.tweet.id === props.highlightedTweet ? { border: "#ff3400 solid 5px", zIndex: '3', position: 'relative', width: '3rem' } : null
    const userImg = props.tweet.user.profile_image_url
    return (
        <div>
            <img alt="userpic" style={style} className="customlocationpin" src={userImg} />
        </div>
    );
}

export default LocationPin;