import React, { useEffect, useState } from "react";
import { getPlaylists } from "../api/getPlaylist";
import { IPlaylist } from "../components/interfaces/apiInterfaces";
import { IconClock, IconPreloader } from "../icons";
import TracklistRow from "../components/TracklistRow";
import { getUserPlaylist } from "../api/getUserPlaylist";
import { getUserId } from "../api/getUserId";
import { checkSavedTracks } from "../api/checkSavedTracks";
import { getSeparateByCommas } from "../utils/utils";
import SongAlbumPlaylistPageHeader from "../components/SongAlbumPlaylistPageHeader";
import PageControlPanel from "../components/PageControlPanel";

interface IPlaylistPage {
  playlistID: string;
  randomColor: string;
  setHeaderName: React.Dispatch<React.SetStateAction<string>>;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setAlbumID: React.Dispatch<React.SetStateAction<string>>;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

export let currentPlaylist: IPlaylist;

function PlaylistPage({
  playlistID,
  randomColor,
  setHeaderName,
  setTrackID,
  setAlbumID,
  setArtistID,
  setRandomColor,
}: IPlaylistPage) {
  const token = window.localStorage.getItem("token");
  const [playlist, setPlaylists] = useState<IPlaylist | null>(null);
  const [list, setList] = useState<[]>([]);
  const [strId, setStrId] = useState("");
  const [listIds, setListIds] = useState([]);
  const [insideMyPlaylist, setInsideMyPlaylist] = useState(false);

  const audio = document.querySelector(".playback") as HTMLAudioElement;

  if (playlist) {
    currentPlaylist = playlist;
  }

  useEffect(() => {
    if (playlistID.length > 0) {
      const foo = async () => {
        setPlaylists(await getPlaylists(token, playlistID));
      };
      foo();
    }
  }, [setPlaylists]);

  useEffect(() => {
    setHeaderName(playlist ? playlist.name : "");

    if (playlist !== null) {
      setStrId(getTracksIds());
    }
  }, [playlist]);

  // extractColors(
  //   document.querySelector(".playlist-header_cover") as HTMLImageElement
  // )
  //   .then(console.log)
  //   .catch(console.error);

  useEffect(() => {
    async function getListOfSavedPlaylists() {
      let id = await getUserId(token);
      setList(await getUserPlaylist(token, id));
    }
    getListOfSavedPlaylists();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      let newIds = list.map((item: any) => {
        return item.id;
      });
      checkPlaylist(newIds);
    }

    function checkPlaylist(ids: string[]) {
      for (let i = 0; i < ids.length; i++) {
        if (ids[i] === playlistID) {
          return setInsideMyPlaylist(true);
        }
      }
    }
  }, [list]);

  const getFollowers = (followers: string) => {
    const reverse = followers.split("").reverse().join("");
    let str = "";
    for (let i = 0; i < followers.length; i++) {
      if (i % 3 === 0) {
        str += `,${reverse[i]}`;
      } else {
        str += reverse[i];
      }
    }

    if (str[0] === ",") {
      return str.slice(1).split("").reverse().join("");
    } else {
      return str.split("").reverse().join("");
    }
  };

  const followers =
    String(playlist?.followers.total).length > 3
      ? getSeparateByCommas(String(playlist?.followers.total))
      : playlist?.followers.total;

  function getTracksIds() {
    let ids = "";
    let index = 0;

    playlist?.tracks.items.forEach((item) => {
      if (index === 50) {
        return ids;
      }
      ids += item.track.id + ",";
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

  return playlist ? (
    <div className="playlist-page">
      <SongAlbumPlaylistPageHeader
        color={randomColor}
        image={
          playlist.images.length
            ? playlist.images[0].url
            : "https://lab.possan.se/thirtify/images/placeholder-playlist.png"
        }
        title={"playlist"}
        name={playlist.name}
        description={playlist.description}
        owner={playlist.owner.display_name}
        followers={followers}
        tracks={playlist.tracks.total}
      />

      <div className="tracklist-table">
        <PageControlPanel
          color={randomColor}
          setIconHeart={false}
          playlist={playlist}
        />
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
        {playlist ? (
          playlist.tracks.items.length > 0 ? (
            playlist.tracks.items.map((item, index) =>
              item ? (
                <TracklistRow
                  key={`${item.track.name}${Math.random()}`}
                  number={index + 1}
                  image={item.track.album.images[0].url}
                  name={item.track.name}
                  trackID={item.track.id}
                  setTrackID={setTrackID}
                  artist={item.track.artists[0].name}
                  artistID={item.track.artists[0].id}
                  setArtistID={setArtistID}
                  album={item.track.album.name}
                  albumID={item.track.album.id}
                  setAlbumID={setAlbumID}
                  data={item.added_at}
                  duration={item.track.duration_ms}
                  uri={item.track.uri}
                  list={list}
                  playlistId={playlist.id}
                  addedTrack={listIds[playlist?.tracks.items.indexOf(item)]}
                  setPlaylists={setPlaylists}
                  setRandomColor={setRandomColor}
                  isPlaying={
                    item.track.id === audio.dataset.track_id ? true : false
                  }
                  insideMyPlaylist={insideMyPlaylist}
                />
              ) : (
                ""
              )
            )
          ) : (
            <p className="no-tracks_ad">Sorry... No trial version of tracks</p>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    <div className="preloader">
      <IconPreloader width={50} height={50} />
    </div>
  );
}

export default PlaylistPage;
