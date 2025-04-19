import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Button } from '@mui/material';

import theme from './theme/muiTheme';
import { AuthProvider, AuthContext } from './context/AuthContext';

import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute     from './routes/AdminRoute';

import Landing        from './pages/Landing';
import Login          from './pages/Login';
import Register       from './pages/Register';
import Dashboard      from './pages/Dashboard';
import Admin          from './pages/Admin';
import Countries      from './pages/Countries';
import CountryDetails from './pages/CountryDetails';

function NavBar() {
  const { user, logout } = React.useContext(AuthContext);
  return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button component={Link} to="/">RestCountries App</Button>
          {user && (
              <>
                <Button component={Link} to="/dashboard">Dashboard</Button>
                {user.role==='admin' && <Button component={Link} to="/admin">Admin</Button>}
                <Button component={Link} to="/countries">Countries</Button>
                <Button onClick={logout} sx={{ ml:'auto' }}>Logout</Button>
              </>
          )}
        </Toolbar>
      </AppBar>
  );
}

export default function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<Landing/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />

              <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
              <Route path="/admin"     element={<ProtectedRoute><AdminRoute><Admin/></AdminRoute></ProtectedRoute>} />
              <Route path="/countries" element={<ProtectedRoute><Countries/></ProtectedRoute>} />
              <Route path="/countries/:name" element={<ProtectedRoute><CountryDetails/></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
  );
}
