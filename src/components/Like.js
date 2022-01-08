import React,{useState,useEffect} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from '../firebase';

const Like = ({userData,postData}) => {
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
                    like===true?<FavoriteIcon className={`icon-styling like`} onClick={handleLike}/> :<FavoriteIcon className={`icon-styling unlike`} onClick={handleLike}/>
                }
                </>:
                <></>
            }
        </div>
    )
}

export default Like
