import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import {
    Paper, Grid, Typography, Chip, CircularProgress
} from '@mui/material';

export default function CountryDetails() {
    const { name } = useParams();
    const [c, setC] = useState(null);

    useEffect(() => {
        api.get(`/countries/${name}`)
            .then(res => setC(res.data[0]))
            .catch(console.error);
    }, [name]);

    if (!c) return <CircularProgress />;

    return (
        <Paper sx={{ p:2, mt:2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img src={c.flag} alt={c.name} width={64} />
                    <Typography variant="h4">{c.name}</Typography>
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
                    {Object.values(c.languages).map(l =>
                        <Chip key={l} label={l} sx={{ mr:1, mb:1 }} />
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
}
