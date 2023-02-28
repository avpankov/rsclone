import React from 'react'
import { getUserSavedTracks } from '../api/getUserSavedTracks';
import { ISavedTracks, IResponseTrack } from '../components/interfaces/apiInterfaces';
import { useEffect, useState } from 'react';
import { IconHeart, IconPlayCard, IconClock, IconPreloader } from "../icons";
import TracklistRow from "../components/TracklistRow";
import PageControlPanel from '../components/PageControlPanel';
import SongAlbumPlaylistPageHeader from "../components/SongAlbumPlaylistPageHeader";
import { getUserPlaylist } from "../api/getUserPlaylist";
import { getUserId } from "../api/getUserId";

interface ISavedTracksPage {
    randomColor: string;
    setTrackID: React.Dispatch<React.SetStateAction<string>>;
    setAlbumID: React.Dispatch<React.SetStateAction<string>>;
    setArtistID: React.Dispatch<React.SetStateAction<string>>;
    setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

function SavedTracksPage({randomColor, setTrackID, setRandomColor, setAlbumID, setArtistID}: ISavedTracksPage) {
    const token = window.localStorage.getItem('token');
    const [savedTracks, setSavedTracks] = useState<ISavedTracks | null>(null)
    const [list, setList] = useState<[]>([]);

    const audio = document.querySelector('.playback') as HTMLAudioElement;

    useEffect(() => {
        async function getSavedTracks() {
            setSavedTracks(await getUserSavedTracks(token))
            let id = await getUserId(token);
            setList(await getUserPlaylist(token, id));
        }
        getSavedTracks()
    }, [])

    return savedTracks ? (
        <div className="playlist-page">
        <SongAlbumPlaylistPageHeader
          color={'#5135AD'}
          image={'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'}
          title={"playlist"}
          name={'Liked Songs'}
          description={''}
          owner={''}
          followers={''}
          tracks={savedTracks ? savedTracks.total : 0}
        />
          <div className="tracklist-table">
          `<PageControlPanel color='#5135AD' setIconHeart={false} />
            <div className="tracklist-table_title">
              <div className="title-number">#</div>
              <div className="title-info">title</div>
              <div className="title-album">album</div>
              <div className="title-date">date added</div>
              <div className="title-time">
                <IconClock fill="#b3b3b3" />
              </div>
            </div>
            <div className="line"></div>
            {savedTracks.items.map((item, index) => (
              <TracklistRow
                key={`${item.track.name}${Math.random()}`}
                number={index + 1}
                image={item.track.album.images[0].url}
                name={item.track.name}
                artist={item.track.artists[0].name}
                album={item.track.album.name}
                artistID={item.track.artists[0].id}
                setArtistID={setArtistID}
                data={item.added_at}
                duration={item.track.duration_ms}
                trackID={item.track.id}
                addedTrack={true}
                setSavedTracks={setSavedTracks}
                setTrackID={setTrackID}
                albumID={item.track.album.id}
                setAlbumID={setAlbumID}
                setRandomColor={setRandomColor}
                isPlaying={(item.track.id === audio.dataset.track_id) ? true : false}
                list={list}
                uri={item.track.uri}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="preloader">
          <IconPreloader width={50} height={50} />
        </div>
      );
}

export default SavedTracksPage