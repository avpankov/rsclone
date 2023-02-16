import React, { useState, useEffect } from "react";
import { IconPlayTracklistRow, IconHeart, IconActiveLike, IconOptions } from "../icons";
import { saveTrack } from "../api/saveTrack";
import { removeTrackFromSaved } from "../api/removeTrackFromSaved";
import { saveTrackToPlaylist } from "../api/saveTrackToPlaylist";
import { removeItemFromPlaylist } from "../api/removeItemFromPlaylist";
import { checkSavedTracks } from "../api/checkSavedTracks";
import { IPlaylist } from "../components/interfaces/apiInterfaces";
import { getPlaylists } from "../api/getPlaylist";
import { ISavedTracks, IResponseTrack } from '../components/interfaces/apiInterfaces';
import { getUserSavedTracks } from '../api/getUserSavedTracks';

interface ITracklistRow {
  number: number;
  image: string;
  name: string;
  artist: string;
  album: string;
  data: string;
  duration: number;
  id?: string;
  addedTrack?: boolean;
  uri?: string;
  list?: [];
  playlistId?: string;
  setPlaylists?: React.Dispatch<React.SetStateAction<IPlaylist | null>>;
  setSavedTracks?: React.Dispatch<React.SetStateAction<ISavedTracks | null>>;
}

interface Imounths {
  [key: number]: string;
}

interface IListOfSavedPlaylists {
  name: string;
  id: string;
}

function TracklistRow({
  number,
  image,
  name,
  artist,
  album,
  data,
  duration,
  id,
  addedTrack,
  uri,
  list,
  playlistId,
  setPlaylists,
  setSavedTracks
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

  const addItemToPlaylist = async (id: string) => {
    if(uri) {
      await saveTrackToPlaylist(token, id, uri)
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

  const addToSaved = async (id: string | undefined) => {
    if(id) {
      await saveTrack(token, id)
      setAdded(true)
    }
  }

  const deleteFromSaved = async (id: string | undefined) => {
    if(id) {
      await removeTrackFromSaved(token, id)
      setAdded(false)
      if(setSavedTracks) {
        setSavedTracks(await getUserSavedTracks(token))
      }
    }
  }

  // const checkTrack = async () => {
  //   if(id) {
  //     let result = await checkSavedTracks(token, id)
  //     console.log(result)
  //   }
  // }

  const getData = (date: string) => {
    let dateAdded = new Date(date);
    const mounths: Imounths = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };

    return `${
      mounths[dateAdded.getMonth()]
    } ${dateAdded.getDate()}, ${dateAdded.getFullYear()}`;
  };

  const getTime = (duration: number) => {
    const seconds = Math.round((duration / 1000) % 60);
    const minutes = Math.round((duration / (1000 * 60)) % 60);

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  console.log(active)
  return (
    <>
        <div
        className={`tracklist-row ${hover}`}
        onMouseEnter={() => setHover("tracklist-hover")}
        onMouseLeave={() => setHover("")}
        >
        <div className="track-number">
          {hover ? <IconPlayTracklistRow fill="#FFFFFF" /> : number}
        </div>
        <div className="track-info">
          <img src={image} alt="album_img" className="track-img" />
          <div className="track-dscr">
            <p className="track-name">{name}</p>
            <p className="track-artist">{artist}</p>
          </div>
        </div>
        <div className="track-album">{album}</div>
        <div className="track-data">{getData(data)}</div>
        <div className="last-block">
          <div
            className={`like-btn`}
            style={hover ? { visibility: "visible" } : { visibility: "hidden" }}
            onClick={() => added ? deleteFromSaved(id) : addToSaved(id)}
          >
            {added 
              ? <IconActiveLike/>
              : <IconHeart />  
            }
          </div>
          <div className="track-time">{getTime(duration)}</div>
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
              <button 
                className='modal-btn context-btn add-to-playlist'
                onClick={deleteItemFromPlaylist}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}

export default TracklistRow;
