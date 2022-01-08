import React,{useState,useEffect} from 'react'
import {database} from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Videos from './Videos'
import  './Posts.css';
import Avatar from '@mui/material/Avatar';
import Like from "./Like";

const Posts = ({userData}) => {
    const [posts,setPosts] = useState(null);

    useEffect(()=>{
        let parr = []
        const unsub =  database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
            parr = []
            querySnapshot.forEach((doc)=>{
                let data =  { ...doc.data(),postId:doc.id}
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub
    },[])
    return (
        <div>
            {
                posts == null || userData==null ? <CircularProgress />:
                    <div className="video-container">
                        {
                            posts.map((post,index)=>(
                                    <React.Fragment key={index}>
                                        <div className="videos">
                                            <Videos src={post.pUrl} id={post.pId}/>
                                            <div className="fa" style = {{display: 'flex'}}>
                                                <Avatar sx={{ width: 50, height: 50 }}
                                                alt="User Avatar" src={post.uProfile}/>
                                                <h4>{post.uName}</h4>
                                            </div>
                                            <Like userData={userData} postData={post}/>
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

