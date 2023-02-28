import React, { useEffect, useState } from "react";
import {
  IAlbum,
  IArtistsTopTrecks,
} from "../components/interfaces/apiInterfaces";
import { IconPreloader, IconClock } from "../icons";
import { getAlbum } from "../api/getAlbum";
import SongAlbumPlaylistPageHeader from "../components/SongAlbumPlaylistPageHeader";
import PageControlPanel from "../components/PageControlPanel";
import TracklistRow from "../components/TracklistRow";
import { getCopyrightsDate } from "../utils/utils";
import { getUserPlaylist } from "../api/getUserPlaylist";
import { getUserId } from "../api/getUserId";
import { checkSavedTracks } from "../api/checkSavedTracks";

interface IAlbumPage {
  albumID: string;
  randomColor: string;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setHeaderName: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

export let currentAlbumTracks: IAlbum;

function AlbumPage({
  albumID,
  randomColor,
  setTrackID,
  setHeaderName,
  setRandomColor,
}: IAlbumPage) {
  const token = window.localStorage.getItem("token");
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const audio = document.querySelector(".playback") as HTMLAudioElement;
  if (album) {
    currentAlbumTracks = album;
  }

  const [list, setList] = useState<[]>([]);
  const [strId, setStrId] = useState("");
  const [listIds, setListIds] = useState([]);

  useEffect(() => {
    if (albumID.length > 0) {
      const foo = async () => {
        setAlbum(await getAlbum(token, albumID));
      };
      foo();
    }
  }, [setAlbum]);

  useEffect(() => {
    setHeaderName(album ? album.name : "");

    if (album !== null) {
      setStrId(getTracksIds());
    }

  }, [album]);

  function getTracksIds() {
    let ids = "";
    let index = 0;

    album?.tracks.items.forEach((item) => {
      if (index === 50) {
        return ids;
      }
      ids += item.id + ",";
      index++;
    });
    return ids;
  }

  useEffect(() => {
    if (strId) {
      const checkTrack = async () => {
        let result = await checkSavedTracks(token, strId);
        setListIds(result);
      };
      checkTrack();
    }
  }, [strId]);

  useEffect(() => {
    async function getListOfSavedPlaylists() {
      let id = await getUserId(token);
      setList(await getUserPlaylist(token, id));
    }
    getListOfSavedPlaylists();
  }, []);

  return album ? (
    <div className="album-page">
      <SongAlbumPlaylistPageHeader
        color={randomColor}
        image={album.images[0].url}
        title={"album"}
        name={album.name}
        age={album.release_date.slice(0, 4)}
        owner={album.artists[0].name}
        tracks={album.tracks.total}
        durationTotal={album.tracks.items.reduce(
          (sum, current) => sum + current.duration_ms,
          0
        )}
      />
      <div className="tracklist-table">
        <PageControlPanel color={randomColor} setIconHeart={false} />
        <div className="tracklist-table_title">
          <div className="title-number">#</div>
          <div className="title-info">title</div>
          <div className="title-album"></div>
          <div className="title-date"></div>
          <div className="title-time">
            <IconClock fill="#b3b3b3" />
          </div>
        </div>
        <div className="line"></div>
        {album.tracks.items.length > 0 ? (
          album.tracks.items.map((item) => (
            <TracklistRow
              key={`${item.name}${Math.random()}`}
              number={item.track_number}
              name={item.name}
              trackID={item.id}
              setTrackID={setTrackID}
              artist={item.artists[0].name}
              artistID={item.artists[0].id}
              duration={item.duration_ms}
              setRandomColor={setRandomColor}
              isPlaying={item.id === audio.dataset.track_id ? true : false}
              list={list}
              addedTrack={listIds[album.tracks.items.indexOf(item)]}
              uri={item.uri}
            />
          ))
        ) : (
          <p className="no-tracks_ad">Sorry... No trial version of tracks</p>
        )}
        <div className="copyrights">
          <div className="copyrights-date">
            {getCopyrightsDate(album.release_date)}
          </div>
          <div className="copyrights-text">
            {" "}
            &#169;{album.copyrights.length ? album.copyrights[0].text : ""}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <IconPreloader width={50} height={50} />
    </div>
  );
}

export default AlbumPage;
