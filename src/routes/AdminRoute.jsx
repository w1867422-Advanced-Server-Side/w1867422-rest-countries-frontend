import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AdminRoute({ children }) {
    const { user } = React.useContext(AuthContext);
    return user?.role === 'admin' ? children : <Navigate to="/dashboard" />;
}