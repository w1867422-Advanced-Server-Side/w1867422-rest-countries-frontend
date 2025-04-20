import React, { useEffect, useState } from 'react';
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, Button, Switch, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api/axiosInstance';

export default function ApiKeysTable() {
    const [keys, setKeys]               = useState([]);
    const [open, setOpen]               = useState(false);
    const [selectedKey, setSelectedKey] = useState(
        localStorage.getItem('apiKey') || ''
    );

    // Fetch user’s keys
    async function fetchKeys() {
        try {
            const { data } = await api.get('/apiKey');
            setKeys(data);
            // Refresh selection in case storage changed
            setSelectedKey(localStorage.getItem('apiKey') || '');
        } catch (err) {
            console.error('Failed to load user API keys', err);
        }
    }

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const { data } = await api.get('/apiKey');
                if (mounted) {
                    setKeys(data);
                    setSelectedKey(localStorage.getItem('apiKey') || '');
                }
            } catch (err) {
                console.error('Failed to load user API keys', err);
            }
        }
        load();
        return () => { mounted = false; };
    }, []);

    // Toggle an existing key’s active flag
    const toggleActive = async (id, active) => {
        await api.put(`/apiKey/${id}`, { active: !active });
        fetchKeys();
    };

    // Delete a key, and clear selection if it was the one
    const deleteKey = async id => {
        const keyToDelete = keys.find(k => k.id === id)?.api_key;
        await api.delete(`/apiKey/${id}`);
        if (keyToDelete && localStorage.getItem('apiKey') === keyToDelete) {
            localStorage.removeItem('apiKey');
            setSelectedKey('');
        }
        fetchKeys();
    };

    // Generate & auto‑select a new key
    const generateKey = async () => {
        const { data } = await api.post('/apiKey');
        const newKey = data.api_key;
        localStorage.setItem('apiKey', newKey);
        setSelectedKey(newKey);
        setOpen(false);
        fetchKeys();
    };

    // User chooses an existing key
    const selectKey = key => {
        localStorage.setItem('apiKey', key);
        setSelectedKey(key);
    };

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Generate New Key
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Generate API Key</DialogTitle>
                <DialogContent>Are you sure you want to create a new key?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={generateKey}>Yes, Generate</Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Key</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell>Use</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {keys.map(k => (
                            <TableRow
                                key={k.id}
                                selected={k.api_key === selectedKey}
                            >
                                <TableCell code>{k.api_key}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={!!k.active}
                                        onChange={() => toggleActive(k.id, k.active)}
                                    />
                                </TableCell>
                                <TableCell>{new Date(k.created_at).toLocaleString()}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => deleteKey(k.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        variant={k.api_key === selectedKey ? 'contained' : 'outlined'}
                                        onClick={() => selectKey(k.api_key)}
                                        disabled={k.api_key === selectedKey}
                                    >
                                        {k.api_key === selectedKey ? 'Selected' : 'Use Key'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}