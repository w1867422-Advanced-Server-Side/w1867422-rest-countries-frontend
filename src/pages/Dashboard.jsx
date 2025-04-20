import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ProfileCard  from '../components/Dashboard/ProfileCard';
import ApiKeysTable from '../components/Dashboard/ApiKeysTable';

export default function Dashboard() {
    return (
        <Container sx={{ mt:4 }}>
            <Typography variant="h4" gutterBottom>User Dashboard</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}><ProfileCard/></Grid>
                <Grid item xs={12} md={8}><ApiKeysTable/></Grid>
            </Grid>
        </Container>
    );
}