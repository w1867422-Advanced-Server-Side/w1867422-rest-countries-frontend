import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import React from "react";

export default function ProtectedRoute({ children }) {
    const { token, user, loading } = React.useContext(AuthContext);

    if (!token && !loading) {
        return <Navigate to="/login" />;
    }
    if (loading) {
        return null;
    }
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}
