import React, { useEffect, useState } from "react";
import { getCategoryPlaylists } from "../api/getCategoryPlaylists";
import { IPlaylistsItems } from "../components/interfaces/apiInterfaces";
import Mix from "../components/Mix";

interface ISectionPage {
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  categoryID: string;
  categoryName: string;
}

function SectionPage({
  setPlaylistsID,
  setRandomColor,
  categoryID,
  categoryName,
}: ISectionPage) {
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
      <p className="mixes-block-header-title">{categoryName}</p>
      <div className="mixes">
        {playlists.length > 0
          ? playlists.map((playlist: IPlaylistsItems) => (
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

export default SectionPage;
