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
    divider: "rgba(0,0,0,0.64)",
  },
  typography: {
    button: {
      letterSpacing: "0.1em",
    },
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
    },
  },
};
const theme = createTheme(themeOptions);

export { theme };
