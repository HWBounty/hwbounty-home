import { createMuiTheme } from "@material-ui/core/styles";

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#6fe3d7",
      main: "#4db6ac",
      dark: "#91a3a1",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffb2ff",
      main: "#ea80fc",
      dark: "#b64fc8",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  },

  spreadIt: {
    rootPadding: {
      padding: 25,
    },
    paper: {
      width: "100%",
      borderRadius: 10,
    },
    inputBase: {
      borderColor: "rgba(0,0,0,0)",
      borderRadius: 2,
    }
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
};

const theme = {
  ...rawTheme,
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;
