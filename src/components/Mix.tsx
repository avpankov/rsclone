import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconPlayCard } from "../icons";
import { removePlaylist } from "../api/removePlaylist";
import { getUserPlaylist } from "../api/getUserPlaylist";
import { getUserId } from "../api/getUserId";
import { changePlaylistDetails } from "../api/changePlaylistDetails";
import EditPlaylist from "../components/EditPlaylist";

interface IMix {
  image: string;
  name: string;
  description: string;
  playlistID?: string;
  setPlaylistsID?: React.Dispatch<React.SetStateAction<string>>;
  artistID?: string;
  setArtistID?: React.Dispatch<React.SetStateAction<string>>;
  albumID?: string;
  setAlbumID?: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  userId?: string;
  setMyPlaylists?: React.Dispatch<React.SetStateAction<[]>>;
  circle?: boolean;
}

function Mix({
  image,
  name,
  description,
  playlistID,
  setPlaylistsID,
  artistID,
  setArtistID,
  albumID,
  setAlbumID,
  setRandomColor,
  userId,
  setMyPlaylists,
  circle,
}: IMix) {
  const [activeCardMode, setActiveCardMode] = useState("");
  const [active, setActive] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const token = window.localStorage.getItem("token");
  const [modalActive, setModalActive] = useState(false);

  const dscrWithoutLinks = (description: string) => {
    if (description.includes("<")) {
      const firstPart = description.slice(0, description.indexOf("<"));
      const intermediatePart = description.slice(description.indexOf(">") + 1);
      const secondPart = intermediatePart.slice(
        0,
        intermediatePart.indexOf("<")
      );
      return `${firstPart} ${secondPart}`;
    } else {
      return description;
    }
  };

  document.addEventListener("click", () => {
    if (active === false) {
      setActive(!active);
    }
  });

  const playMusic = () => {
    // play
  };

  const showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(!active);
    const newPosition = {
      x: e.pageX,
      y: e.pageY,
    };
    setPosition(newPosition);
  };

  const deletePlaylist = async (e: React.MouseEvent<HTMLElement>) => {
    if (playlistID) {
      await removePlaylist(playlistID, token);
      setActive(!active);
    }
    if (setMyPlaylists !== undefined && userId !== undefined) {
      setMyPlaylists(await getUserPlaylist(token, userId));
    }
  };

  const setIdValue = () => {
    if (setPlaylistsID && playlistID) {
      setPlaylistsID(playlistID);
    } else if (setArtistID && artistID) {
      setArtistID(artistID);
    } else if (setAlbumID && albumID) {
      setAlbumID(albumID);
    }
  };

  const setPath = () => {
    if (setPlaylistsID && playlistID) {
      return `/playlist/${playlistID}`;
    } else if (setArtistID && artistID) {
      return `/artist/${artistID}`;
    } else if (setAlbumID && albumID) {
      return `/album/${albumID}`;
    } else {
      return "/";
    }
  };

  return (
    <>
      <div
        className="card-wrapper"
        onMouseEnter={() => setActiveCardMode("hover")}
        onMouseLeave={() => setActiveCardMode("")}
        onContextMenu={showContextMenu}
      >
        <div className={`card-play-btn ${activeCardMode}`}>
          {/* <div className="circle" onClick={playMusic}>
          <IconPlayCard />
        </div> */}
        </div>

        <Link
          to={setPath()}
          className={"playlist-link"}
          onClick={() =>
            setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`)
          }
        >
          <div
            className={`card ${activeCardMode}`}
            onClick={() => setIdValue()}
          >
            <div
              className="card-img"
              style={
                circle ? { borderRadius: "50%" } : { borderRadius: "none" }
              }
            >
              <img
                src={
                  image
                    ? image
                    : "https://lab.possan.se/thirtify/images/placeholder-playlist.png"
                }
                alt="/"
                style={
                  circle ? { borderRadius: "50%" } : { borderRadius: "none" }
                }
              />
            </div>
            <div className="card-text">
              <div className="card-name">{name}</div>
              <div className="card-dscr">{dscrWithoutLinks(description)}</div>
            </div>
          </div>
        </Link>
      </div>

      {setMyPlaylists !== undefined ? (
        <div
          style={{ top: position.y, left: position.x }}
          className={active ? "modal-context hidden" : "modal-context"}
          hidden
        >
          <button className="modal-btn context-btn" onClick={deletePlaylist}>
            Delete
          </button>
          <button
            className="modal-btn context-btn"
            onClick={() => setModalActive(!modalActive)}
          >
            Edit playlist
          </button>
        </div>
      ) : (
        ""
      )}

      {modalActive ? (
        <EditPlaylist
          setModalActive={setModalActive}
          modalActive={modalActive}
          playlistID={playlistID ? playlistID : ""}
          userId={userId ? userId : ""}
          setMyPlaylists={setMyPlaylists}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Mix;
