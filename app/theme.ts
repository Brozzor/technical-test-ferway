import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "18px",
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: "#111111",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#838c91",
    },
  },
});

export default theme;