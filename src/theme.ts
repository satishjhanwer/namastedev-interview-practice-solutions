import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0B5FFF" },
    secondary: { main: "#6E56CF" },
    success: { main: "#16a34a" },
    warning: { main: "#d97706" },
    background: { default: "#f6f8fb", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#475569" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    h4: { fontWeight: 700, letterSpacing: 0.2 },
    button: { textTransform: "none" } // 🔹 no shouting
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.1)",
        },
      },
    },
    MuiChip: {
      defaultProps: { size: "small", variant: "outlined" },
      styleOverrides: { root: { textTransform: "capitalize" } }
    },
    MuiTextField: { defaultProps: { size: "small" } },
  },
});

export default theme;
