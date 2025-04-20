import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import {
    Paper, Table, TableHead, TableBody,
    TableRow, TableCell, TableContainer,
    TextField, Button
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [q, setQ] = useState('');

    async function fetchAll() {
        try {
            const { data } = await api.get('/countries');
            setCountries(data);
        } catch (err) {
            console.error('Failed to load countries', err);
        }
    }

    useEffect(() => {
        let mounted = true;

        async function loadAll() {
            try {
                const { data } = await api.get('/countries');
                if (mounted) setCountries(data);
            } catch (err) {
                console.error('Failed to load countries', err);
            }
        }

        loadAll();
        return () => { mounted = false; };
    }, []);

    const handleSearch = async () => {
        if (!q.trim()) {
            return fetchAll();
        }
        try {
            const { data } = await api.get(`/countries/${q}`);
            setCountries(data);
        } catch {
            setCountries([]);
        }
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <TextField
                label="Search by name"
                value={q}
                onChange={e => setQ(e.target.value)}
            />
            <Button onClick={handleSearch} sx={{ ml: 1 }}>Go</Button>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
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
                                sx={{ textDecoration: 'none' }}
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
        </Paper>
    );
}
