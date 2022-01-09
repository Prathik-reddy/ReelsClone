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

const Posts = ({ userData }) => {
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = useState(null);
    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

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
                                                alt="User Avatar" src={post.uProfile} />
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
                                                    <Card className="card1">
                                                        <Comments postData={post} />
                                                    </Card>
                                                    <Card variant="outlined" className="card2">
                                                        <Typography style={{ padding: '0.4rem' }}>{post.likes.length === 0 ? 'Liked by nobody' : `Liked by ${post.likes.length} users`}</Typography>
                                                        <div style={{ display: 'flex' }}>
                                                            <Like2 postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
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

