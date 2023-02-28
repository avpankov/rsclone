import React, { useEffect, useState } from "react";
import Mix from "./Mix";
import { IPlaylistsItems } from "./interfaces/apiInterfaces";
import { getCategoryPlaylists } from "../api/getCategoryPlaylists";
import { Link } from "react-router-dom";

interface IMixesBlock {
  name: string;
  categoryID: string;
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  setCategoryID: React.Dispatch<React.SetStateAction<string>>;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
}

function MixesBlock({
  name,
  categoryID,
  setPlaylistsID,
  setRandomColor,
  setCategoryID,
  setCategoryName,
}: IMixesBlock) {
  const token = window.localStorage.getItem("token");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function foo() {
      setPlaylists(await getCategoryPlaylists(token, categoryID));
    }
    foo();
  }, [token, categoryID]);

  return (
    <div className="mixes-block">
      <div className="mixes-block-header">
        <p className="mixes-block-header-title">{name}</p>
        <Link
          to={`/section/${categoryID}`}
          className="mixes-block-header-show"
          onClick={() => {
            setCategoryID(categoryID);
            setCategoryName(name);
          }}
        >
          <p>show all</p>
        </Link>
      </div>
      <div className="mixes">
        {playlists.length > 0
          ? playlists
              .slice(0, 7)
              .map((playlist: IPlaylistsItems) => (
                <Mix
                  key={`${playlist.name}${Math.random()}`}
                  image={playlist.images[0].url}
                  name={playlist.name}
                  description={playlist.description}
                  playlistID={playlist.id}
                  setPlaylistsID={setPlaylistsID}
                  setRandomColor={setRandomColor}
                />
              ))
          : ""}
      </div>
    </div>
  );
}

export default MixesBlock;
