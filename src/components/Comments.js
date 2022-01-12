import React, { useState ,useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import {database} from '../firebase'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ChatBubble from '@material-ui/icons/ChatBubble';
const Comments = ({postData}) => {
    const [comments, setComments] = useState([]);
    console.log(postData.comments.length);
    async function fetchComments(){
        let arr = [];
        for(let i=0;i<postData.comments.length;i++){
            let data = await database.comments.doc(postData.comments[i]).get();
            arr.push(data.data());
        }
        setComments(arr);

    }
    useEffect(() =>{
            fetchComments();
    },[postData])
    // console.log(comments,comments.length);
    return (
        <div>
        {
            comments.length===0?
            <>
                <div style ={{display: 'flex',alignItems: 'center' ,justifyContent: 'center',flexDirection: 'column'}}>
                    <h3>NO COMMENTS YET...</h3>
                    <p>Be the first to post a comment on this video</p>
                </div>
            </>:
            <>
            {
                comments.map((comment,index)=>(
                    <>
                    <div style={{display:'flex',padding : "1rem"}} key = {index}>
                        <Avatar  src={comment.uProfileImage}/>
                        <p style = {{margin:"3% 0"}}>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                    </div>
                    <div  style={{display:'flex', alignItems: 'center', justifyContent: 'space-around'}} key = {index}>
                        <ThumbUpIcon/>
                        <ThumbDownIcon/>
                        <ChatBubble/>
                    </div>
                    </>
                ))
            }
            </>
        }
    </div>
    )
}

export default Comments
