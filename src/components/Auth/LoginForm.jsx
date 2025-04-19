import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import api from '../../api/axiosInstance';

export default function LoginForm({ onSuccess }) {
    const [email,setEmail]=useState(''),
        [password,setPassword]=useState(''),
        [err,setErr]=useState('');

    const submit=async e=>{
        e.preventDefault();
        try {
            const { data }=await api.post('/auth/login',{email,password});
            onSuccess(data.token,data.user);
        } catch(ex) {
            setErr(ex.response?.data?.message||ex.message);
        }
    };

    return (
        <form onSubmit={submit}>
            {err&&<Alert severity="error" sx={{mb:2}}>{err}</Alert>}
            <TextField label="Email" fullWidth required value={email}
                       onChange={e=>setEmail(e.target.value)} sx={{mb:2}}/>
            <TextField label="Password" type="password" fullWidth required
                       value={password} onChange={e=>setPassword(e.target.value)} sx={{mb:2}}/>
            <Button type="submit" variant="contained">Login</Button>
        </form>
    );
}
