import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { token } = React.useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
}