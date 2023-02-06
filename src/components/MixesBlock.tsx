import React, { useEffect, useState } from "react";
import Mix from "./Mix";
import { IPlaylistsItems } from "./interfaces/apiInterfaces";
import { getCategoryPlaylists } from "../api/getCategoryPlaylists";
import { Link } from "react-router-dom";

interface IMixesBlock {
  name: string;
  categoryID: string;
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
}

function MixesBlock({ name, categoryID, setPlaylistsID }: IMixesBlock) {
  const token = window.localStorage.getItem("token");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function foo() {
      setPlaylists(await getCategoryPlaylists(token, categoryID));
    }
    foo();
  }, []);

  return (
    <div className="mixes-block">
      <div className="mixes-block-header">
        <p className="mixes-block-header-title">{name}</p>
        <p className="mixes-block-header-show">show all</p>
      </div>
      <div className="mixes">
        {playlists.length > 0
          ? playlists.map((playlist: IPlaylistsItems) => (
              <Link to={"/playlist"}>
                <Mix
                  key={playlist.name}
                  image={playlist.images[0].url}
                  name={playlist.name}
                  description={playlist.description}
                  id={playlist.id}
                  setPlaylistsID={setPlaylistsID}
                />
              </Link>
            ))
          : ""}
      </div>
    </div>
  );
}

export default MixesBlock;
