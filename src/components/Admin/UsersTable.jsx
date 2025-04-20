import React, { useEffect, useState } from 'react';
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, IconButton, Select, MenuItem,
    Dialog, DialogTitle, DialogActions, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api/axiosInstance';

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [dialog, setDialog] = useState({ open: false, id: null });

    async function fetchUsers() {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data);
        } catch (err) {
            console.error('Failed to load users', err);
        }
    }

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const { data } = await api.get('/admin/users');
                if (mounted) setUsers(data);
            } catch (err) {
                console.error('Failed to load users', err);
            }
        }

        load();
        return () => { mounted = false; };
    }, []);

    const changeRole = async (id, role) => {
        await api.put(`/admin/users/${id}`, { role });
        fetchUsers();
    };

    const deleteUser = async () => {
        await api.delete(`/admin/users/${dialog.id}`);
        setDialog({ open: false, id: null });
        fetchUsers();
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Joined</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(u => (
                            <TableRow key={u.id}>
                                <TableCell>{u.username}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>
                                    <Select
                                        value={u.role}
                                        onChange={e => changeRole(u.id, e.target.value)}
                                    >
                                        <MenuItem value="user">User</MenuItem>
                                        <MenuItem value="admin">Admin</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setDialog({ open: true, id: u.id })}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={dialog.open} onClose={() => setDialog({ open: false, id: null })}>
                <DialogTitle>Confirm Delete User?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDialog({ open: false, id: null })}>Cancel</Button>
                    <Button color="error" onClick={deleteUser}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
