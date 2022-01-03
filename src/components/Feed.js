import React ,{useContext}from 'react'
import { AuthContext } from '../Context/AuthContext'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
const Feed = () => {
    const {Logout , user} = useContext(AuthContext);
    // console.log(user);
    return (
        <div>
            <h1>Welcome to feed </h1>
            <Stack direction="row" spacing={2}>
            <Avatar>H</Avatar>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.email[0].toUpperCase()}</Avatar>
            </Stack>
            <button onClick={Logout}>Logout</button>
        </div>
    )
}

export default Feed
