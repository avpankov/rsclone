import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconButtonPlay, IconHeart, IconMoreInfo, IconActiveLike, IconOptions } from "../../icons";
import { playPauseTrack, selectAndGetTrack } from "../../utils/playback";
import { saveTrack } from "../../api/saveTrack";
import { removeTrackFromSaved } from "../../api/removeTrackFromSaved";
import { saveTrackToPlaylist } from "../../api/saveTrackToPlaylist";

interface IListOfSavedPlaylists {
  name: string;
  id: string;
}

function SearchResultSong(props: {
  image: string;
  name: string;
  author: string;
  artistID: string;
  duration: string | number;
  id: string;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  list: [];
  addedTrack: boolean;
  uri: string;
}) {
  const [added, setAdded] = useState(false)
  const token = window.localStorage.getItem('token');
  const [active, setActive] = useState(true);
  const [playlistsList, setPlaylistsList] = useState(false);

  useEffect(() => {
    setAdded(props.addedTrack)
  }, [props.addedTrack])

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
    }
  }

  const showContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setActive(!active)
  }

  const addItemToPlaylist = async (trackID: string) => {
    await saveTrackToPlaylist(token, trackID, props.uri)
  }

  document.addEventListener('click', () => {
    if(active === false) {
      setActive(!active)
    }
  })

  return (
    <div className='search-result-song track tracklist-song' id={props.id} onClick={() => selectAndGetTrack(props.id)}>
      <div className='search-result-song__image'>
        <img src={props.image} alt="/" />
        <button
          className="player-tool-button play-pause-song"
          onClick={() => {
            playPauseTrack(props.id);
          }}
        >
          <IconButtonPlay />
        </button>
      </div>
      <div className="track-info">
        <div className="track-name">
          <Link
            to={`/track/${props.id}`}
            className="track-name"
            onClick={() => {
              props.setRandomColor(
                `#${Math.random().toString(16).slice(3, 9)}`
              );
              if (props.id && props.setTrackID) {
                props.setTrackID(props.id);
              }
            }}
          >
            <p>{props.name}</p>
          </Link>
          {/* <a href="/">{props.name}</a> */}
        </div>
        <div className="track-author">
          <Link
            to={`/artist/${props.artistID}`}
            className="track-artist"
            onClick={() => {
              props.setRandomColor(
                `#${Math.random().toString(16).slice(3, 9)}`
              );
              if (props.artistID && props.setArtistID) {
                props.setArtistID(props.artistID);
              }
            }}
          >
            <p>{props.author}</p>
          </Link>
          {/* <a href="/">{props.author}</a> */}
        </div>
      </div>
      <button className="player-tool-button">
      <div 
        className="like-btn" 
        onClick={() => added ? deleteFromSaved(props.id) : addToSaved(props.id)}
      >  
          {added 
            ? <IconActiveLike/>
            : <IconHeart />  
          }
        </div>
      </button>
      <div>{props.duration}</div>

      <button className="player-tool-button"  onClick={showContextMenu}>
          <IconMoreInfo />

          <div className={active ? 'more-info hidden' : 'more-info'}>
              <button 
                className='modal-btn context-btn add-to-playlist' 
                onMouseEnter={() => setPlaylistsList(true)}
                onMouseLeave={() => setPlaylistsList(false)}
              >
                Add to playlist

                {playlistsList 
                ? 
                <div className="list-of-playlists">
                  {props.list ? props.list.map((item: IListOfSavedPlaylists) => (
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
      </div>
      </button>
    </div>
  );
}

export default SearchResultSong;
