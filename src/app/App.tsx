import { Routes, Route, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Home from "./pages/Home";
import SolutionPage from "./pages/SolutionPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar sx={{ py: 1 }}>
          <Typography
            variant="h4"
            sx={{ flexGrow: 1, fontWeight: 800, color: "text.primary" }}
            component={RouterLink}
            to="/"
          >
            NamasteDev Practice
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              endIcon={<OpenInNewIcon />}
              href="https://namastedev.com/practice?search=&sortBy=default&language=reactJs&difficulty_level=All&status=All&companies=All&tags=All&page=1"
              target="_blank"
              rel="noreferrer noopener"
            >
              Problems
            </Button>
            {/* TODO: set your repo URL */}
            <Button
              endIcon={<OpenInNewIcon />}
              href="https://github.com/satishjhanwer/namastedev-interview-practice-solutions"
              target="_blank"
              rel="noreferrer noopener"
            >
              Repo
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ py: 3 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/s/:slug" element={<SolutionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
}
