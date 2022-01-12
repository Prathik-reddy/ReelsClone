import React,{useState,useEffect} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from '../firebase';

const Like2 = ({userData,postData}) => {
    const [like,setLike] = useState(null);

    useEffect(()=>{
        let check = postData.likes.includes(userData.userId)?true:false;
        setLike(check);
    },[postData])

    const handleLike = ()=>{
        if(like === true){
            let nar =  postData.likes.filter((elem)=>elem!==userData.userId);
            database.posts.doc(postData.postId).update({
                likes : nar
            })
        }else{
            let nar  = [...postData.likes,userData.userId];
            database.posts.doc(postData.postId).update({
                likes : nar
            })
        }
    }
    return (
        <div>
            {
                like!=null?
                <>
                {
                    like==true?<FavoriteIcon style={{padding:'0.5rem'}} className={`like`} onClick={handleLike}/> :<FavoriteIcon style={{padding:'0.5rem'}} className={`unlike2`} onClick={handleLike}/>
                }
                </>:
                <></>
            }
        </div>
    )
}

export default Like2
