import React, { useState, useEffect } from 'react';
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, Button, Switch, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api/axiosInstance';

export default function ApiKeysTable() {
    const [keys, setKeys] = useState([]);
    const [open, setOpen] = useState(false);

    const fetchKeys = async () => {
        const { data } = await api.get('/apiKey');
        setKeys(data);
    };

    useEffect(fetchKeys, []);

    const toggleActive = async (id, active) => {
        await api.put(`/apiKey/${id}`, { active: !active });
        fetchKeys();
    };

    const deleteKey = async id => {
        await api.delete(`/apiKey/${id}`);
        fetchKeys();
    };

    const generateKey = async () => {
        await api.post('/apiKey');
        setOpen(false);
        fetchKeys();
    };

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Generate New Key
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Generate API Key</DialogTitle>
                <DialogContent>Are you sure?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={generateKey}>Yes</Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper} sx={{ mt:2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Key</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {keys.map(k => (
                            <TableRow key={k.id}>
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
        </>
    );
}
