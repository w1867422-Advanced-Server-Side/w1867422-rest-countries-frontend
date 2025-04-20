import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import api from '../../api/axiosInstance';

export default function MetricsCards() {
    const [counts, setCounts] = useState({ users: 0, keys: 0 });

    useEffect(() => {
        let mounted = true;

        async function fetchMetrics() {
            try {
                const { data: allUsers } = await api.get('/admin/users');
                const { data: allKeys  } = await api.get('/admin/apiKeys');
                if (mounted) {
                    setCounts({ users: allUsers.length, keys: allKeys.length });
                }
            } catch (err) {
                console.error('Failed to load metrics', err);
            }
        }

        fetchMetrics();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Total Users</Typography>
                    <Typography variant="h4">{counts.users}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Total API Keys</Typography>
                    <Typography variant="h4">{counts.keys}</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}
