import React, { useContext } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import LoginForm from '../components/Auth/LoginForm';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const { login } = useContext(AuthContext);
    return (
        <Container maxWidth="sm" sx={{ mt:4 }}>
            <Paper sx={{ p:4 }}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <LoginForm onSuccess={login} />
            </Paper>
        </Container>
    );
}
