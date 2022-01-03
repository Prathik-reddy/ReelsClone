import React,{useContext} from 'react';
import { Navigate,Outlet } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
const PrivateRoute = () => {
    const {user} = useContext(AuthContext);
    // console.log(user);
    return (
        user ? <Outlet /> : <Navigate to="/Login" />
    )
}

export default PrivateRoute;
