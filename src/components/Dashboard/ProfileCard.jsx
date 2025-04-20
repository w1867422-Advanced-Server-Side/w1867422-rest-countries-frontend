import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

export default function ProfileCard() {
    const { user } = useContext(AuthContext);
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Profile</Typography>
                <Typography>Username: {user.username}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Role: {user.role}</Typography>
                <Typography>Joined: {new Date(user.created_at).toLocaleDateString()}</Typography>
            </CardContent>
        </Card>
    );
}