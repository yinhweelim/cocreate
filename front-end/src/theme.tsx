import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#307A70",
    },
    secondary: {
      main: "#e64a19",
    },
  },
  typography: {
    button: {
      letterSpacing: "0.1em",
    },
    body1: {
      fontWeight: 200,
    },
    body2: {
      fontWeight: 200,
    },
    h1: {
      fontSize: "6rem",
    },
    subtitle1: {
      fontSize: "0.8rem",
      fontWeight: 300,
    },
    subtitle2: {
      fontSize: "0.7rem",
    },
  },
};
const theme = createTheme(themeOptions);

export { theme };
