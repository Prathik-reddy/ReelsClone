import React from 'react'
import  './Video.css';
import ReactDOM from 'react-dom';

const Videos = (props) => {
    const handleClick = (e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }
    const handleScroll = (e)=>{
        e.preventDefault();
        let nextVideo = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if(nextVideo){
            nextVideo.scrollIntoView();
            e.target.muted = true;
        }
    }
    return (
           <video src ={props.src} id={props.id}  className="videos-styling"  muted = "muted" onClick = {handleClick}  onEnded = {handleScroll}>

           </video>
    )
}

export default Videos
