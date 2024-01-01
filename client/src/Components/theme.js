import { createTheme } from "@mui/material/styles";

const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.2rem",
  fontFamily: "Roboto, sans-serif",
  fontWeight: "normal",

  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

theme.typography.subtitle1 = {
  fontSize: "14px",
  fontFamily: "Roboto, sans-serif",
  fontWeight: "normal",

  "@media (min-width:600px)": {
    fontSize: "14px",
  },

  [theme.breakpoints.up("lg")]: {
    fontSize: "16px",
  },
};

theme.typography.body1 = {
  fontSize: "14px",
  fontFamily: "Roboto, sans-serif",
  fontWeight: "normal",

  "@media (min-width:600px)": {
    fontSize: "14px",
  },

  [theme.breakpoints.up("lg")]: {
    fontSize: "16px",
  },
};

theme.typography.h6 = {
  fontSize: "14px",
  fontFamily: "Roboto, sans-serif",
  fontWeight: "bold",

  "@media (min-width:600px)": {
    fontSize: "14px",
  },

  [theme.breakpoints.up("lg")]: {
    fontSize: "16px",
  },
};

export default theme;
