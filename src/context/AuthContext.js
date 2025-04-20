import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [token, setToken]     = useState(localStorage.getItem('token'));
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(!!token);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        let mounted = true;
        async function loadProfile() {
            try {
                // pre‑check expiry
                const { exp } = jwtDecode(token);
                if (Date.now() >= exp * 1000) {
                    logout();
                    return;
                }

                const res = await api.get('/auth/profile');
                if (mounted) setUser(res.data);
            } catch {
                // invalid token or network error
                logout();
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadProfile();
        return () => {
            mounted = false;
        };
    }, [token]);

    function login(newToken, userData) {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
        navigate(userData.role === 'admin' ? '/admin' : '/dashboard');
    }

    function register(newToken, userData) {
        login(newToken, userData);
    }

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}