import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PlayingBar from "./components/view/PlayingBar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SettingsBar from "./components/SettingsBar";
import "./styles/main.scss";
import SearchPage from "./pages/SearchPage";
import Library from "./pages/Library";
import PlaylistPage from "./pages/PlaylistPage";
import { useAppDispatch } from "./store/hook";
import { addScrollHeight } from "./store/scrollHeightSlice";
import SavedTracksPage from "./pages/SavedTracksPage";
import AlbumPage from "./pages/AlbumPage";
import TrackPage from "./pages/TrackPage";
import ArtistPage from "./pages/ArtistPage";
import EditPlaylist from "./components/EditPlaylist";
import SectionPage from "./pages/SectionPage";

function App() {
  const CLIENT_ID = "1f1f06f4b7fc4796921496a5f9a14d20";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState<string | null>("");
  const [playlistID, setPlaylistsID] = useState<string>("");
  const [albumID, setAlbumID] = useState<string>("");
  const [artistID, setArtistID] = useState<string>("");
  const [trackID, setTrackID] = useState<string>("");
  const [categoryID, setCategoryID] = useState<string>("");
  const [randomColor, setRandomColor] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");

  const [playlistName, setPlaylistName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [myPlaylists, setMyPlaylists] = useState<[]>([]);
  const [headerName, setHeaderName] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((el) => el.startsWith("access_token"))
        ?.split("=")[1] as string;

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
          <SettingsBar headerName={headerName} />
          <NavBar
            userId={userId}
            myPlaylists={myPlaylists}
            setUserId={setUserId}
            setMyPlaylists={setMyPlaylists}
          />
          <div
            className="main-view"
            onScroll={(e) =>
              dispatch(addScrollHeight(e.currentTarget.scrollTop))
            }
          >
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    setPlaylistsID={setPlaylistsID}
                    setRandomColor={setRandomColor}
                    setCategoryID={setCategoryID}
                    setCategoryName={setCategoryName}
                  />
                }
              />
              <Route
                path="/search/*"
                element={
                  <SearchPage
                    setPlaylistsID={setPlaylistsID}
                    setAlbumID={setAlbumID}
                    setArtistID={setArtistID}
                    setTrackID={setTrackID}
                    setRandomColor={setRandomColor}
                    setCategoryID={setCategoryID}
                    setCategoryName={setCategoryName}
                  />
                }
              />
              <Route
                path="/library"
                element={
                  <Library
                    setPlaylistsID={setPlaylistsID}
                    setRandomColor={setRandomColor}
                    myPlaylists={myPlaylists}
                    userId={userId}
                    setMyPlaylists={setMyPlaylists}
                    setUserId={setUserId}
                  />
                }
              />
              <Route
                path="/library/liked-tracks"
                element={
                  <SavedTracksPage
                    randomColor={randomColor}
                    setTrackID={setTrackID}
                    setArtistID={setArtistID}
                    setAlbumID={setAlbumID}
                    setRandomColor={setRandomColor}
                  />
                }
              />
              <Route
                path={`/playlist/${playlistID}`}
                element={
                  <PlaylistPage
                    playlistID={playlistID}
                    randomColor={randomColor}
                    setHeaderName={setHeaderName}
                    setTrackID={setTrackID}
                    setAlbumID={setAlbumID}
                    setArtistID={setArtistID}
                    setRandomColor={setRandomColor}
                  />
                }
              />
              <Route
                path={`/album/${albumID}`}
                element={
                  <AlbumPage
                    albumID={albumID}
                    randomColor={randomColor}
                    setTrackID={setTrackID}
                    setHeaderName={setHeaderName}
                    setRandomColor={setRandomColor}
                  />
                }
              />
              <Route
                path={`/track/${trackID}`}
                element={
                  <TrackPage
                    trackID={trackID}
                    albumID={albumID}
                    artistID={artistID}
                    randomColor={randomColor}
                    setTrackID={setTrackID}
                    setArtistID={setArtistID}
                    setAlbumID={setAlbumID}
                    setHeaderName={setHeaderName}
                    setRandomColor={setRandomColor}
                  />
                }
              />
              <Route
                path={`/artist/${artistID}`}
                element={
                  <ArtistPage
                    trackID={trackID}
                    albumID={albumID}
                    artistID={artistID}
                    randomColor={randomColor}
                    setTrackID={setTrackID}
                    setArtistID={setArtistID}
                    setAlbumID={setAlbumID}
                    setHeaderName={setHeaderName}
                    setRandomColor={setRandomColor}
                  />
                }
              />
              <Route
                path={`/section/${categoryID}`}
                element={
                  <SectionPage
                    setPlaylistsID={setPlaylistsID}
                    setRandomColor={setRandomColor}
                    categoryID={categoryID}
                    categoryName={categoryName}
                  />
                }
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
