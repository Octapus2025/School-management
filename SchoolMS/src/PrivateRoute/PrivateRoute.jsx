import React from 'react';
import { Navigate } from 'react-router-dom';


//Function to check if the user is authentication
const isAuthenticated = ()=>{
    //Check if the auth token is in localStorage
    const token = localStorage.getItem('authToken')
    console.log("Auth Token:",token)
    return !!token;
};

const PrivateRoute = ({children}) =>{
    return isAuthenticated() ? children : <Navigate to="/adminlogin"/>;
};

export default PrivateRoute;