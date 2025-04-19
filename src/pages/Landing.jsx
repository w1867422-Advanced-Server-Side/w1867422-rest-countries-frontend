import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <Container sx={{ textAlign:'center', mt:8 }}>
            <Typography variant="h3" gutterBottom>Welcome to RestCountries App</Typography>
            <Button component={Link} to="/login" variant="contained" sx={{ mr:2 }}>Login</Button>
            <Button component={Link} to="/register" variant="outlined">Register</Button>
        </Container>
    );
}