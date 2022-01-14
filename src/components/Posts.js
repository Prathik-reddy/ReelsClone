import React, { useState, useEffect } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Videos from './Videos'
import './Posts.css';
import Avatar from '@mui/material/Avatar';
import Like from "./Like";
import ChatBubble from '@material-ui/icons/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments'
import {useNavigate} from 'react-router-dom';

const Posts = ({ userData }) => {
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = useState(null);
    const navigate = useNavigate();

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    const handleAvatarClick = () => {
        navigate(`profile/${userData.userId}`);
    }

    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub
    }, [])

    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0]
            console.log(ele)
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, {threshold:0.6});
    useEffect(()=>{
        const elements = document.querySelectorAll(".videos")
        elements.forEach((element)=>{
            observer.observe(element)
        })
        return ()=>{
            observer.disconnect();
        }
    },[posts])
    return (
        <div>
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <div className="video-container">
                        {
                            posts.map((post, index) => (
                                <React.Fragment key={index}>
                                    <div className="videos">
                                        <Videos src={post.pUrl} id={post.pId} />
                                        <div className="fa" style={{ display: 'flex' }}>
                                            <Avatar sx={{ width: 50, height: 50 }}
                                                alt="User Avatar" src={post.uProfile} onClick={handleAvatarClick} />
                                            <h4>{post.uName}</h4>
                                        </div>
                                        <Like userData={userData} postData={post} />
                                        <ChatBubble className="chat-styling" onClick={() => handleClickOpen(post.pId)} />
                                        <Dialog open={open === post.pId} onClose={handleClose} aria-describedby="alert-dialog-slide-description" fullwidth="true" maxWidth="xl">
                                            <div className="modal-container">
                                                <div className="video-modal">
                                                    <video autoPlay={true} muted="muted" controls>
                                                        <source src={post.pUrl} />
                                                    </video>
                                                </div>
                                                <div className="comment-modal">
                                                    <Card className="card1" style={{overflow: 'scroll'}}>
                                                        <Comments postData={post} />
                                                    </Card>
                                                    <Card variant="outlined" className="card2">
                                                        <Typography style={{ margin: '0.4rem' }}>{post.likes.length === 0 ? 'Liked by nobody' : `Liked by ${post.likes.length} users`}</Typography>
                                                        <div style={{ display: 'flex' }}>
                                                            <Like2 postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
                                                            <AddComment style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} userData={userData} postData={post} />
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Posts

