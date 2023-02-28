import React from "react";
import { IResponseAlbum } from "./interfaces/apiInterfaces";
import Mix from "./Mix";

interface AlbumsBlock {
  albums?: IResponseAlbum[];
  all?: boolean;
  albumID: string;
  setAlbumID: React.Dispatch<React.SetStateAction<string>>;
  artistID: string;
  artistName: string;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function ArtistsAlbumsBlock({
  albums,
  all,
  albumID,
  setAlbumID,
  artistID,
  artistName,
  setRandomColor,
}: AlbumsBlock) {
  return (
    <div className="mixes-block">
      <div className="mixes-block-header">
        <p className="mixes-block-header-title">
          {!all
            ? albums
              ? albums.length > 0 && albums[0].album_type
                ? `${albums[0].album_type[0].toUpperCase()}${albums[0].album_type.slice(
                    1
                  )}s by ${artistName}`
                : ""
              : ""
            : albums
            ? albums.length > 0
              ? `Discography`
              : ""
            : ""}
        </p>
      </div>
      <div className="mixes">
        {albums?.map((item) => (
          <Mix
            key={`${item.name}${Math.random()}`}
            image={
              item.images && item.images.length > 0
                ? item.images[0].url
                : "https://lab.possan.se/thirtify/images/placeholder-playlist.png"
            }
            name={item.name}
            description={`${item.release_date.slice(0, 4)} • ${
              item.album_type
            }`}
            albumID={item.id}
            setAlbumID={setAlbumID}
            setRandomColor={setRandomColor}
          />
        ))}
      </div>
    </div>
  );
}

export default ArtistsAlbumsBlock;
