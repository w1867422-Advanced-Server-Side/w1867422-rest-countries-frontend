import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Paper, Table, TableHead, TableBody,
    TableRow, TableCell, TableContainer,
    TextField, Button, Alert, CircularProgress
} from '@mui/material';
import api from '../api/axiosInstance';

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [q, setQ]                 = useState('');
    const [error, setError]         = useState('');
    const [loading, setLoading]     = useState(true);

    useEffect(() => {
        let mounted = true;
        async function validateAndLoad() {
            try {
                const { data: keys } = await api.get('/apiKey');
                const sel = localStorage.getItem('apiKey');
                if (!sel) {
                    setError('No API key selected. Go to Dashboard.');
                    return;
                }
                const found = keys.find(k => k.api_key === sel);
                if (!found) {
                    setError('Key not found. Go to Dashboard.');
                    return;
                }
                if (!found.active) {
                    setError('Key inactive. Please activate or select another.');
                    return;
                }

                const { data } = await api.get('/countries');
                if (mounted) {
                    setCountries(data);
                    setError('');
                }
            } catch {
                if (mounted) setError('Failed to load countries.');
            } finally {
                if (mounted) setLoading(false);
            }
        }

        validateAndLoad();
        return () => { mounted = false; };
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const sel = localStorage.getItem('apiKey');
            if (!sel) {
                setError('No API key selected.');
                setCountries([]);
                return;
            }
            const { data: keys } = await api.get('/apiKey');
            const found = keys.find(k => k.api_key === sel);
            if (!found || !found.active) {
                setError('Key invalid or inactive.');
                setCountries([]);
                return;
            }
            const { data } = await api.get(`/countries/${q}`);
            setCountries(data);
        } catch {
            setError('Search failed.');
            setCountries([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Paper sx={{ p:4, mt:4, textAlign:'center' }}>
                <CircularProgress />
            </Paper>
        );
    }

    return (
        <Paper sx={{ p:2, mt:2 }}>
            {error && (
                <Alert severity="error" sx={{ mb:2 }}>
                    {error}{' '}
                    {!localStorage.getItem('apiKey') && <Link to="/dashboard">Dashboard</Link>}
                </Alert>
            )}

            <TextField
                label="Search by name"
                value={q}
                onChange={e => setQ(e.target.value)}
            />
            <Button onClick={handleSearch} sx={{ ml:1 }}>Go</Button>

            {!error && (
                <TableContainer component={Paper} sx={{ mt:2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Flag</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Capital</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {countries.map(c => (
                                <TableRow
                                    key={c.name}
                                    component={Link}
                                    to={`/countries/${c.name}`}
                                    hover
                                    sx={{ textDecoration:'none' }}
                                >
                                    <TableCell>
                                        <img src={c.flag} alt={c.name} width={32} />
                                    </TableCell>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.capital}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
}
