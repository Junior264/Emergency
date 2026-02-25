import React from 'react';
import { UseAuth } from './AuthContext';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = UseAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate>
    } else {
        return children;
    }
};

export default ProtectedRoute;
