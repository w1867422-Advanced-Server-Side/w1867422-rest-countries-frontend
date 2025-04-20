import React, { useEffect, useState } from 'react';
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, Switch, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api/axiosInstance';

export default function ApiKeysTable({ adminView=false }) {
    const [keys, setKeys] = useState([]);

    const fetchKeys = async () => {
        const url = adminView ? '/admin/apiKeys' : '/apiKey';
        const { data } = await api.get(url);
        setKeys(data);
    };

    useEffect(fetchKeys, []);

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
        <TableContainer component={Paper} sx={{ mt:2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {adminView && <TableCell>User Email</TableCell>}
                        <TableCell>Key</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map(k => (
                        <TableRow key={k.id}>
                            {adminView && <TableCell>{k.user_email}</TableCell>}
                            <TableCell code>{k.api_key}</TableCell>
                            <TableCell>
                                <Switch checked={!!k.active} onChange={() => toggleActive(k.id, k.active)} />
                            </TableCell>
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
