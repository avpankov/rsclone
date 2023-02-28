import React, { useEffect, useState } from "react";
import { searchItems } from "../api/searchItems";
import { IResponseArtist } from "../components/interfaces/apiInterfaces";
import Mix from "../components/Mix";

interface ISearchPage {
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  searchKey: string;
}

function ArtistsSearchPage({
  setArtistID,
  setRandomColor,
  searchKey,
}: ISearchPage) {
  const token = window.localStorage.getItem("token");
  const [artists, setArtists] = useState<IResponseArtist[] | null>(null);

  useEffect(() => {
    const foo = async () => {
      const data = await searchItems(searchKey, token);
      setArtists(data.artists.items);
    };
    foo();
  }, [searchKey, token]);

  return (
    <div className="mixes mixes-search">
      {artists &&
        artists.map((artist) => (
          <Mix
            key={artist.id}
            image={
              artist.images?.length
                ? artist.images[0].url
                : "https://lab.possan.se/thirtify/images/placeholder-playlist.png"
            }
            name={artist.name}
            description="Artist"
            artistID={artist.id}
            setArtistID={setArtistID}
            setRandomColor={setRandomColor}
          />
        ))}
    </div>
  );
}

export default ArtistsSearchPage;
