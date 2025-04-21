import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import React from "react";

export default function ProtectedRoute({ children }) {
    const { token, user, loading } = React.useContext(AuthContext);

    if (!token && !loading) {
        return <Navigate to="/" />;
    }
    if (loading) {
        return null;
    }
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
}
