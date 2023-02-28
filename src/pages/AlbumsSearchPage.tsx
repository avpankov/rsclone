import { useEffect, useState } from "react";
import { searchItems } from "../api/searchItems";
import { IResponseAlbum } from "../components/interfaces/apiInterfaces";
import Mix from "../components/Mix";

interface ISearchPage {
  setAlbumID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  searchKey: string;
}

function AlbumsSearchPage({
  setAlbumID,
  setRandomColor,
  searchKey,
}: ISearchPage) {
  const token = window.localStorage.getItem("token");
  const [albums, setAlbums] = useState<IResponseAlbum[] | null>(null);

  useEffect(() => {
    const foo = async () => {
      const data = await searchItems(searchKey, token);
      setAlbums(data.albums.items);
    };
    foo();
  }, [searchKey, token]);

  return (
    <div className="mixes">
      {albums &&
        albums.map((album) =>
          album ? (
            <Mix
              key={album.id}
              image={
                album.images?.length
                  ? album.images[0].url
                  : "https://lab.possan.se/thirtify/images/placeholder-playlist.png"
              }
              name={album.artists[0].name}
              description={`${album.release_date.split("-")[0]} • ${
                album.name
              }`}
              albumID={album.id}
              setAlbumID={setAlbumID}
              setRandomColor={setRandomColor}
            />
          ) : (
            ""
          )
        )}
    </div>
  );
}

export default AlbumsSearchPage;
