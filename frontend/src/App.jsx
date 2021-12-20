import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import EditionsPage from "./pages/Editions";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import responsiveFontSizes from "@mui/material/styles/responsiveFontSizes";
import ViewPost from "./components/ui/EditionPost/layout/Full/Full";

function App() {
  let theme = React.useMemo(() => createTheme({}));
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="editions" element={<EditionsPage />} />
            <Route exact path="editions/:editionId" element={<ViewPost />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
