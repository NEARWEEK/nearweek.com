import React, { Suspense, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditionsPage from "./pages/Editions";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import responsiveFontSizes from "@mui/material/styles/responsiveFontSizes";
import EditionPost from "./components/ui/EditionPost/EditionPost";
import News from "./pages/News";
import NewsPost from "./components/ui/NewsPost/NewsPost";

function App() {
  let theme = useMemo(() =>
    createTheme({
      overrides: {},
    })
  );
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="editions" element={<EditionsPage />} />
            <Route exact path="editions/:editionId" element={<EditionPost />} />
            <Route exact path="news" element={<News />} />
            <Route exact path="news/:articleId" element={<NewsPost />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
