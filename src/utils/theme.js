import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '400px !important',
          padding: '0px !important',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#EF3B36',
    },
    secondary: {
      main: '#fff',
    },
  },
});

export default theme;
