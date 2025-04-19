import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser]   = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const { exp, role } = jwtDecode(token);
            if (Date.now() >= exp * 1000) return logout();
            api.get('/auth/profile').then(r => setUser(r.data)).catch(logout);
        }
    }, [token]);

    function login(tok, userData) {
        localStorage.setItem('token', tok);
        setToken(tok);
        setUser(userData);
        navigate(userData.role === 'admin' ? '/admin' : '/dashboard');
    }
    function register(tok, userData) { login(tok, userData); }
    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
