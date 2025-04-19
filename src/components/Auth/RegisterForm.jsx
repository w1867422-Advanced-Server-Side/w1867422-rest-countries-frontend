import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import api from '../../api/axiosInstance';

export default function RegisterForm({ onSuccess }) {
    const [username, setUsername] = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/register', { username, email, password });
            onSuccess(data.token, data.user);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}
            <TextField
                label="Username" fullWidth required
                value={username} onChange={e => setUsername(e.target.value)}
                sx={{ mb:2 }}
            />
            <TextField
                label="Email" fullWidth required
                value={email} onChange={e => setEmail(e.target.value)}
                sx={{ mb:2 }}
            />
            <TextField
                label="Password" type="password" fullWidth required
                value={password} onChange={e => setPassword(e.target.value)}
                sx={{ mb:2 }}
            />
            <Button type="submit" variant="contained">Register</Button>
        </form>
    );
}
