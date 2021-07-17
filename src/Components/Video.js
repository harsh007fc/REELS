import React from 'react'

function Video(props) {

    let handleMute = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }
    // console.log(props.source);

    return (
        <>
            <video src={props.source} className='video-styles' onClick={handleMute} controls muted='muted' type='video/mp4'  ></video>
        </>
    )
}

export default Video
