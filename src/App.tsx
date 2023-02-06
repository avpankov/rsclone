import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PlayingBar from "./components/view/PlayingBar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SettingsBar from "./components/SettingsBar";
import "./styles/main.scss";
import SearchPage from "./pages/SearchPage";
import PlaylistPage from "./pages/PlaylistPage";

function App() {
  const CLIENT_ID = "1f1f06f4b7fc4796921496a5f9a14d20";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState<string | null>("");
  const [playlistID, setPlaylistsID] = useState<string>("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((el) => el.startsWith("access_token"))
        ?.split("=")[1] as string;
      console.log(token);

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return (
    <Router>
      {!token ? (
        <Routes>
          <Route
            path="/"
            element={
              <AuthPage
                CLIENT_ID={CLIENT_ID}
                REDIRECT_URI={REDIRECT_URI}
                AUTH_ENDPOINT={AUTH_ENDPOINT}
                RESPONSE_TYPE={RESPONSE_TYPE}
              />
            }
          />
        </Routes>
      ) : (
        <main>
          <SettingsBar />
          <NavBar />
          <div className="main-view">
            <Routes>
              <Route
                path="/"
                element={<HomePage setPlaylistsID={setPlaylistsID} />}
              />
              <Route
                path="/search"
                element={<SearchPage setPlaylistsID={setPlaylistsID} />}
              />
              <Route
                path="/playlist"
                element={<PlaylistPage playlistID={playlistID} />}
              />
            </Routes>
          </div>
          <PlayingBar />
        </main>
      )}
    </Router>
  );
}

export default App;
