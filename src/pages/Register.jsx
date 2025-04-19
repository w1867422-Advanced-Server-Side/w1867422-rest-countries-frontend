import React, { useContext } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import RegisterForm from '../components/Auth/RegisterForm';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
    const { register } = useContext(AuthContext);
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p:4 }}>
                <Typography variant="h5" gutterBottom>Register</Typography>
                <RegisterForm onSuccess={register} />
            </Paper>
        </Container>
    );
}
