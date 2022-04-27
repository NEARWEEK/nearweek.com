import React, { Suspense } from "react";
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
import Video from "./pages/Video";
import VideoPost from "./components/ui/VideoPost/VideoPost";
import UserProfile from "./components/ui/UserProfile/UserProfile";
import UploadNews from "./components/ui/UploadNews/UploadNews";
import ProtectedRoute from "./guard/ProtectedRoute/ProtectedRoute";
import { MessageText } from "./components/ui/general/MessageText/MessageText";
import { useStoreState } from "easy-peasy";
import { Helmet } from "react-helmet";
import { Initializer } from "./providers/Initializer/Initializer";

function App() {
  const message = useStoreState((state) => state.main.messages);

  let theme = createTheme({
    breakpoints: {
      values: {
        xxs: 0, // small phone
        xs: 300, // phone
        sm: 600, // tablets
        md: 900, // small laptop
        lg: 1200, // desktop
        xl: 1536, // large screens
      },
    },
    palette: {
      primary: {
        main: "#0d00ff",
      },
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            paddingLeft: 0,
            paddingRight: 0,
            "@media screen  and (max-width: 600px)": {
              minHeight: "56px",
              paddingLeft: 0,
              paddingRight: 0,
            },
            "@media screen  and (min-width: 601px)": {
              minHeight: "72px",
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
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="editions" element={<Editions />} />
            <Route exact path="editions/:editionId" element={<EditionPost />} />
            <Route exact path="content" element={<News />} />
            <Route exact path="content/:articleId" element={<NewsPost />} />
            <Route exact path="events" element={<Events />} />
            <Route exact path="events/:eventId" element={<EventPost />} />
            <Route exact path="video" element={<Video />} />
            <Route exact path="video/:videoId" element={<VideoPost />} />
            <Route element={<ProtectedRoute />}>
              <Route exact path="user-profile" element={<UserProfile />} />
              <Route exact path="upload-news" element={<UploadNews />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <MessageText message={message} />
    </ThemeProvider>
  );
}

export default App;
