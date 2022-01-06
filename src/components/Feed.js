import React ,{useState,useContext,useEffect}from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from "./UploadFile";
import {database} from '../firebase';

const Feed = () => {
    const {Logout , user} = useContext(AuthContext);
    console.log(user);
    const [userData, setuserData] = useState("")
    useEffect(() => {
      const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
        setuserData(snapshot.data())
        console.log(snapshot.data());
      })
      return ()=>{unsub()}
    }, [user])

    return (
        <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column'}}>
                <UploadFile user = {userData}/>
        </div>
    )
}

export default Feed
