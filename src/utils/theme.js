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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #fff inset",
            WebkitTextFillColor: "#000",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #fff inset",
            WebkitTextFillColor: "black",
            borderRadius: 'inherit',
          },
          "&.Mui-focused input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #fff inset",
          },
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
