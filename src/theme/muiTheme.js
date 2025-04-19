import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#0D47A1', contrastText: '#fff' },
        secondary: { main: '#FFC107' }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: { backgroundColor: '#0D47A1' }
            }
        }
    }
});

export default theme;
