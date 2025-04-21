import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import {
    Paper, Grid, Typography, Chip, CircularProgress
} from '@mui/material';

// keep track of which country names we’ve already fetched
const _fetchedNames = new Set();

export default function CountryDetails() {
    const { name } = useParams();
    const [c, setC] = useState(null);

    useEffect(() => {
        // only fetch once per country name
        if (_fetchedNames.has(name)) return;
        _fetchedNames.add(name);

        let mounted = true;
        async function load() {
            try {
                const { data } = await api.get(`/countries/${name}`);
                if (mounted) setC(data[0]);
            } catch (err) {
                console.error('Failed to load country details', err);
            }
        }

        load();
        return () => { mounted = false; };
    }, [name]);

    if (!c) {
        return (
            <Paper sx={{ p:4, mt:4, textAlign:'center' }}>
                <CircularProgress />
            </Paper>
        );
    }

    return (
        <Paper sx={{ p:2, mt:2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img src={c.flag} alt={c.name} width={64} />
                    <Typography variant="h4" sx={{ mt:1 }}>{c.name}</Typography>
                </Grid>
                {c.capital && (
                    <Grid item xs={6}>
                        <Typography><strong>Capital:</strong> {c.capital}</Typography>
                    </Grid>
                )}
                <Grid item xs={6}>
                    <Typography><strong>Currencies:</strong></Typography>
                    {Object.entries(c.currencies).map(([code, cur]) => (
                        <Chip key={code} label={`${cur.name} (${cur.symbol})`} sx={{ mr:1, mb:1 }} />
                    ))}
                </Grid>
                <Grid item xs={6}>
                    <Typography><strong>Languages:</strong></Typography>
                    {Object.values(c.languages).map(l => (
                        <Chip key={l} label={l} sx={{ mr:1, mb:1 }} />
                    ))}
                </Grid>
            </Grid>
        </Paper>
    );
}
