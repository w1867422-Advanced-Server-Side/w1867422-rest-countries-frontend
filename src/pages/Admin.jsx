import React from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import MetricsCards from '../components/Admin/MetricsCards';
import UsersTable   from '../components/Admin/UsersTable';
import ApiKeysTable from '../components/Admin/ApiKeysTable';

export default function Admin() {
    const [tab, setTab] = React.useState(0);

    return (
        <Container sx={{ mt:4 }}>
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            <MetricsCards />
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ my:2 }}>
                <Tab label="Users" />
                <Tab label="API Keys" />
            </Tabs>
            <Box>
                {tab === 0 && <UsersTable />}
                {tab === 1 && <ApiKeysTable adminView />}
            </Box>
        </Container>
    );
}
