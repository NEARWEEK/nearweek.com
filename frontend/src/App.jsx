import React, { Suspense, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editions from "./pages/Editions";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import responsiveFontSizes from "@mui/material/styles/responsiveFontSizes";
import EditionPost from "./components/ui/EditionPost/EditionPost";
import News from "./pages/News";
import NewsPost from "./components/ui/NewsPost/NewsPost";
import Events from "./pages/Events";
import EventPost from "./components/ui/EventPost/EventPost";

function App() {
  const defaultTheme = createTheme();
  let theme = createTheme({
    palette: {
      primary: {
        main: "#0d00ff",
      },
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: "72px",
            paddingLeft: 0,
            paddingRight: 0,
            "@media screen  and (max-width: 600px)": {
              minHeight: "56px",
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="editions" element={<Editions />} />
            <Route exact path="editions/:editionId" element={<EditionPost />} />
            <Route exact path="news" element={<News />} />
            <Route exact path="news/:articleId" element={<NewsPost />} />
            <Route exact path="events" element={<Events />} />
            <Route exact path="events/:eventId" element={<EventPost />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
