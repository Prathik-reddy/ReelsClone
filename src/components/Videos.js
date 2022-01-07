import React from 'react'

const Videos = (props) => {
    console.log(props);
    return (
           <video src ={props.src} id={props.id}  className="videos-styling">

           </video>
    )
}

export default Videos
