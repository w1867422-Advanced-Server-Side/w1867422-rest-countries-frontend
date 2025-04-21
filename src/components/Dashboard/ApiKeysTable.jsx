import React, { useEffect, useState } from 'react';
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, Button, Switch, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api/axiosInstance';

export default function ApiKeysTable() {
    const [keys, setKeys]        = useState([]);
    const [open, setOpen]        = useState(false);
    const [selectedKey, setSelectedKey] =
        useState(localStorage.getItem('apiKey') || '');

    /* ─── helpers ─── */
    const fetchKeys = async () => {
        try {
            const { data } = await api.get('/apiKey');   // returns usage_count & last_used
            setKeys(data);
            setSelectedKey(localStorage.getItem('apiKey') || '');
        } catch (err) {
            console.error('Failed to load user API keys', err);
        }
    };

    useEffect(() => { fetchKeys(); }, []);

    const toggleActive = async (id, active) => {
        await api.put(`/apiKey/${id}`, { active: !active });
        fetchKeys();
    };

    const deleteKey = async id => {
        const raw = keys.find(k => k.id === id)?.api_key;
        await api.delete(`/apiKey/${id}`);
        if (raw && localStorage.getItem('apiKey') === raw) {
            localStorage.removeItem('apiKey');
            setSelectedKey('');
        }
        fetchKeys();
    };

    const generateKey = async () => {
        const { data } = await api.post('/apiKey');
        const raw = data.api_key;
        localStorage.setItem('apiKey', raw);
        setSelectedKey(raw);
        setOpen(false);
        fetchKeys();
    };

    const selectKey = key => {
        localStorage.setItem('apiKey', key);
        setSelectedKey(key);
    };

    /* ─── render ─── */
    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Generate New Key
            </Button>

            {/* confirm dialog */}
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
                            <TableCell>Created&nbsp;At</TableCell>
                            <TableCell align="right">Usage&nbsp;Count</TableCell>
                            <TableCell>Last&nbsp;Used</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell>Use</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {keys.map(k => (
                            <TableRow key={k.id} selected={k.api_key === selectedKey}>
                                <TableCell><code>{k.api_key}</code></TableCell>

                                <TableCell>
                                    <Switch
                                        checked={!!k.active}
                                        onChange={() => toggleActive(k.id, k.active)}
                                    />
                                </TableCell>

                                <TableCell>
                                    {new Date(k.created_at).toLocaleString()}
                                </TableCell>

                                <TableCell align="right">
                                    {k.usage_count ?? 0}
                                </TableCell>

                                <TableCell>
                                    {k.last_used
                                        ? new Date(k.last_used).toLocaleString()
                                        : 'Never'}
                                </TableCell>

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