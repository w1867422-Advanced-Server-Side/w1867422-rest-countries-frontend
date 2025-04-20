import React, { useEffect, useState } from 'react';
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, Switch, IconButton, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api/axiosInstance';

export default function ApiKeysTable({ adminView = true }) {
    const [keys, setKeys] = useState([]);

    // fetch all keys (adminView=true hits /admin/apiKeys)
    async function fetchKeys() {
        try {
            const url = adminView ? '/admin/apiKeys' : '/apiKey';
            const { data } = await api.get(url);
            setKeys(data);
        } catch (err) {
            console.error('Failed to load API keys', err);
        }
    }

    useEffect(() => {
        fetchKeys();
    }, [adminView]);

    const toggleActive = async (id, active) => {
        const url = adminView ? `/admin/apiKeys/${id}` : `/apiKey/${id}`;
        await api.put(url, { active: !active });
        fetchKeys();
    };

    const deleteKey = async id => {
        const url = adminView ? `/admin/apiKeys/${id}` : `/apiKey/${id}`;
        await api.delete(url);
        fetchKeys();
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ p: 2 }}>
                {adminView ? 'All API Keys' : 'My API Keys'}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {adminView && <TableCell>User Email</TableCell>}
                        <TableCell>API Key</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Usage Count</TableCell>         {/* New column */}
                        <TableCell>Created At</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map(k => (
                        <TableRow key={k.id}>
                            {adminView && <TableCell>{k.user_email}</TableCell>}
                            <TableCell>
                                <Typography component="code">{k.api_key}</Typography>
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={!!k.active}
                                    onChange={() => toggleActive(k.id, k.active)}
                                />
                            </TableCell>
                            <TableCell>{k.usage_count}</TableCell>  {/* Display usage_count */}
                            <TableCell>{new Date(k.created_at).toLocaleString()}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => deleteKey(k.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}