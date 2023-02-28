import React from 'react';
import { IconPlayCard } from "../icons";
import { Link } from "react-router-dom";
import { getUserSavedTracks } from '../api/getUserSavedTracks';
import { ISavedTracks } from '../components/interfaces/apiInterfaces';
import { useEffect, useState } from 'react';

interface ILikedSongs {
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function LikedSongs({ setRandomColor }: ILikedSongs) {
  const token = window.localStorage.getItem('token');
  const [savedTracks, setSavedTracks] = useState<ISavedTracks | null>(null)

  useEffect(() => {
      async function getSavedTracks() {
        setSavedTracks(await getUserSavedTracks(token))
      }
      getSavedTracks()
  }, [])

  return (
    <Link
      to={`/library/liked-tracks`}
      className={"playlist-link liked-songs-box"}
      onClick={() =>
        setRandomColor(`#${Math.random().toString(16).slice(3, 9)}`)
      }
    >
        <div className='liked-songs-box__tracks'> 
        </div>
        <div className='linked-songs-box__bottom'>
          <div className='linked-songs-box__info'>
              <h3 className='liked-songs-box__title'>Liked Songs</h3>
              <div className='liked-songs-box__amount'>{savedTracks?.total} liked songs</div>
          </div >
          {/* <button className='liked-songs-box__btn btn-reset'>
            <div className="circle">
              <IconPlayCard />
            </div>
          </button> */}
        </div >
    </Link>
  )
}

export default LikedSongs