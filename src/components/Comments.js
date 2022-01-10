import React, { useState ,useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import {database} from '../firebase'

const Comments = ({postData}) => {
    const [comments, setComments] = useState([]);
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
    return (
        <div>
        {
            comments===null?
            <>
            <h3>NO COMMENTS YET</h3>
            {
                console.log("commentssss" ,comments)
            }
            </>
            :
            <>
            {
                comments.map((comment,index)=>(
                    <div style={{display:'flex',padding : "1rem",}} key = {index}>
                        <Avatar  src={comment.uProfileImage}/>
                        <p style = {{margin:"3% 0"}}>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                    </div>
                ))
            }
            </>
        }
    </div>
    )
}

export default Comments
