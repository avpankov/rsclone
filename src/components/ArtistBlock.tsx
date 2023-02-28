import React from "react";
import { IResponseArtist } from "./interfaces/apiInterfaces";
import Mix from "./Mix";

interface IArtistBlock {
  albums?: IResponseArtist[];
  artistID: string;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  artistName: string;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  circle: boolean;
}

function ArtistBlock({
  albums,
  artistID,
  setArtistID,
  artistName,
  setRandomColor,
  circle,
}: IArtistBlock) {
  console.log(albums);
  return (
    <div className="mixes-block">
      <div className="mixes-block-header">
        <p className="mixes-block-header-title">Fans also like</p>
      </div>
      <div className="mixes">
        {albums?.map((item) =>
          item ? (
            <Mix
              key={`${item.name}${Math.random()}`}
              image={
                item.images && item.images.length > 0
                  ? item.images[0].url
                  : "https://lab.possan.se/thirtify/images/placeholder-playlist.png"
              }
              name={item.name}
              description={item.type}
              artistID={item.id}
              setArtistID={setArtistID}
              setRandomColor={setRandomColor}
              circle={circle}
            />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}

export default ArtistBlock;
