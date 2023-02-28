import React, { useState, useEffect } from "react";
import { IconPlayTracklistRow, IconHeart, IconActiveLike, IconOptions, IconButtonPlay, IconButtonPause } from "../icons";
import { saveTrack } from "../api/saveTrack";
import { removeTrackFromSaved } from "../api/removeTrackFromSaved";
import { saveTrackToPlaylist } from "../api/saveTrackToPlaylist";
import { removeItemFromPlaylist } from "../api/removeItemFromPlaylist";
import { checkSavedTracks } from "../api/checkSavedTracks";
import { IPlaylist } from "../components/interfaces/apiInterfaces";
import { getPlaylists } from "../api/getPlaylist";
import { ISavedTracks, IResponseTrack } from '../components/interfaces/apiInterfaces';
import { getUserSavedTracks } from '../api/getUserSavedTracks';

import { Link } from "react-router-dom";
import { playPauseTrack, selectAndGetTrack } from "../utils/playback";
import { getTracklistRowData, convertTrackTime } from "../utils/utils";


interface ITracklistRow {
  number: number;
  image?: string;
  name: string;
  trackID: string;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  artist?: string;
  artistID?: string;
  setArtistID?: React.Dispatch<React.SetStateAction<string>>;
  album?: string;
  albumID?: string;
  setAlbumID?: React.Dispatch<React.SetStateAction<string>>;
  data?: string;
  duration: number;
  addedTrack?: boolean;
  uri?: string;
  list?: [];
  playlistId?: string;
  setPlaylists?: React.Dispatch<React.SetStateAction<IPlaylist | null>>;
  setSavedTracks?: React.Dispatch<React.SetStateAction<ISavedTracks | null>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>
  isPlaying: boolean;
  insideMyPlaylist?: boolean;
}

interface Imounths {
  [key: number]: string;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  isPlaying: boolean
}

interface IListOfSavedPlaylists {
  name: string;
  id: string;
}

function TracklistRow({
  number,
  image,
  name,
  trackID,
  setTrackID,
  artist,
  artistID,
  setArtistID,
  album,
  albumID,
  setAlbumID,
  data,
  duration,
  addedTrack,
  uri,
  list,
  playlistId,
  setPlaylists,
  setSavedTracks,
  setRandomColor,
  isPlaying,
  insideMyPlaylist
}: ITracklistRow) {
  const [hover, setHover] = useState("");
  const token = window.localStorage.getItem('token');
  const [added, setAdded] = useState(false)

  const [active, setActive] = useState(true);
  const [playlistsList, setPlaylistsList] = useState(false);

  const showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setActive(!active)
  }

  document.addEventListener('click', () => {
    if(active === false) {
      setActive(!active)
    }
  })

  useEffect(() => {
    if(addedTrack) {
      setAdded(true)
    }
  }, [])

  const addItemToPlaylist = async (trackID: string) => {
    if(uri) {
      await saveTrackToPlaylist(token, trackID, uri)
    }
  }

  const deleteItemFromPlaylist = async () => {
    if(playlistId && uri) {
      await removeItemFromPlaylist(token, playlistId, uri)
      if(setPlaylists) {
        setPlaylists(await getPlaylists(token, playlistId))
      }
    }
  }

  const addToSaved = async (trackID: string | undefined) => {
    if(trackID) {
      await saveTrack(token, trackID)
      setAdded(true)
    }
  }

  const deleteFromSaved = async (trackID: string | undefined) => {
    if(trackID) {
      await removeTrackFromSaved(token, trackID)
      setAdded(false)
      if(setSavedTracks) {
        setSavedTracks(await getUserSavedTracks(token))
      }
    }
  }

  // const getData = (date: string) => {
  //   let dateAdded = new Date(date);
  //   const mounths: Imounths = {
  //     0: "Jan",
  //     1: "Feb",
  //     2: "Mar",
  //     3: "Apr",
  //     4: "May",
  //     5: "Jun",
  //     6: "Jul",
  //     7: "Aug",
  //     8: "Sep",
  //     9: "Oct",
  //     10: "Nov",
  //     11: "Dec",
  //   };

  //   return `${
  //     mounths[dateAdded.getMonth()]
  //   } ${dateAdded.getDate()}, ${dateAdded.getFullYear()}`;
  // };

  // const getTime = (duration: number) => {
  //   const seconds = Math.round((duration / 1000) % 60);
  //   const minutes = Math.round((duration / (1000 * 60)) % 60);

  //   return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  // };

  
  return (
    <div
      className="tracklist-row tracklist-song"
      id={trackID}
      onClick={() => selectAndGetTrack(trackID)}
    >
      <div className="track-number">
        <span className="number">{number}</span>
        <button className='player-tool-button play-pause-song' onClick={() => { playPauseTrack(trackID) }}>
          {!isPlaying ? <IconButtonPlay/> : <IconButtonPause/>}
        </button>
      </div>
      <div className="track-info">
        {image ? <img src={image} alt="album_img" className="track-img" /> : ""}
        <div className="track-dscr">
          <Link
            to={`/track/${trackID}`}
            className="track-name"
            onClick={() => {
              setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`);
              if (trackID && setTrackID) {
                setTrackID(trackID);
              }
            }}
          >
            <p>{name}</p>
          </Link>
          <Link
            to={`/artist/${artistID}`}
            className="track-artist"
            onClick={() => {
              setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`);
              if (artistID && setArtistID) {
                setArtistID(artistID);
              }
            }}
          >
            <p>{artist}</p>
          </Link>
        </div>
      </div>
      <Link
        to={`/album/${albumID}`}
        className="track-album"
        onClick={() => {
          setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`);
          if (albumID && setAlbumID) {
            setAlbumID(albumID);
          }
        }}
      >
        {album ? album : ""}
      </Link>
      <div className="track-data">{data ? getTracklistRowData(data) : ""}</div>

      <div className="last-block">
        <div className="like-btn" onClick={() => added ? deleteFromSaved(trackID) : addToSaved(trackID)}>
          {added 
            ? <IconActiveLike/>
            : <IconHeart />  
          }
        </div>
        <div className="track-time">{convertTrackTime(duration)}</div>

        <div className="track-options" onClick={showContextMenu}>
            <IconOptions/>

            <div className={active ? 'options-menu hidden' : 'options-menu'} hidden>
              <button 
                className='modal-btn context-btn add-to-playlist' 
                onMouseEnter={() => setPlaylistsList(true)}
                onMouseLeave={() => setPlaylistsList(false)}
              >
                Add to playlist

                {playlistsList 
                ? 
                <div className="list-of-playlists">
                  {list ? list.map((item: IListOfSavedPlaylists) => (
                    <div 
                      className="list-of-playlists__item" 
                      key={Math.random()}
                      onClick={() => addItemToPlaylist(item.id)}
                    >
                      {item.name}
                    </div>
                  ))
                    : ''}
                </div>
                : ''
                }
              </button>
              {insideMyPlaylist 
                ? 
                  <button 
                  className='modal-btn context-btn add-to-playlist'
                  onClick={deleteItemFromPlaylist}
                >
                  Delete
                </button>
               : ''}
            </div>
        </div>
      </div>
    </div>
  );
}

export default TracklistRow;
