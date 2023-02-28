import React from "react";
import { Link } from "react-router-dom";

function SearchResultArtist(props: {
  artistName: string;
  artistImage: string;
  artistID: string;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="search-result-artist">
      <Link
        to={`/artist/${props.artistID}`}
        onClick={() => {
          props.setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`);
          if (props.artistID && props.setArtistID) {
            props.setArtistID(props.artistID);
          }
        }}
      >
        <div>
          <img
            src={props.artistImage}
            alt=""
            className="search-result-artist__image"
          />
          <p className="search-result-artist__title">{props.artistName}</p>
        </div>
      </Link>
    </div>
  );
}

export default SearchResultArtist;
