import React, { useState } from "react";
import LikedSongs from "../components/LikedSongs";
import { useEffect } from "react";
import { getUserPlaylist } from "../api/getUserPlaylist";
import Mix from "../components/Mix";
import { IPlaylistsItems } from "../components/interfaces/apiInterfaces";
import { getUserId } from "../api/getUserId";
import EditPlaylist from "../components/EditPlaylist";
import { changePlaylistDetails } from "../api/changePlaylistDetails";

interface ILibraryPage {
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  myPlaylists: [];
  userId: string;
  setMyPlaylists: React.Dispatch<React.SetStateAction<[]>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

function Library({
  setPlaylistsID,
  setRandomColor,
  myPlaylists,
  userId,
  setMyPlaylists,
  setUserId,
}: ILibraryPage) {
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    async function getUser() {
      let id = await getUserId(token);
      setMyPlaylists(await getUserPlaylist(token, id));
    }
    getUser();
  }, []);

  return (
    <div className="library">
      <div className="library__container">
        <h2 className="library__title">Playlists</h2>
        <div className="library__playlists">
          <LikedSongs setRandomColor={setRandomColor} />
          {myPlaylists.length > 0
            ? myPlaylists.map((playlist: IPlaylistsItems) =>
                playlist ? (
                  <div key={`${playlist.name}${Math.random()}`}>
                    <Mix
                      image={
                        playlist.images.length > 0 ? playlist.images[0].url : ""
                      }
                      name={playlist.name}
                      description={playlist.description}
                      playlistID={playlist.id}
                      setPlaylistsID={setPlaylistsID}
                      setRandomColor={setRandomColor}
                      userId={userId}
                      setMyPlaylists={setMyPlaylists}
                    />
                  </div>
                ) : (
                  ""
                )
              )
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Library;
