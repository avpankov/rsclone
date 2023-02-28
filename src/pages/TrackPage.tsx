import React, { useEffect, useState } from "react";
import {
  IAlbum,
  IArtistsAlbums,
  IArtistsTopTrecks,
  IResponseTrack,
} from "../components/interfaces/apiInterfaces";
import { getTrack } from "../api/getTrack";
import SongAlbumPlaylistPageHeader from "../components/SongAlbumPlaylistPageHeader";
import { IconPreloader } from "../icons";
import { getCopyrightsDate } from "../utils/utils";
import PageControlPanel from "../components/PageControlPanel";
import { getArtistsTopTrack } from "../api/getArtistsTopTrack";
import TracklistRow from "../components/TracklistRow";
import ArtistsAlbumsBlock from "../components/ArtistsAlbumsBlock";
import { getArtistsAlbums } from "../api/getArtistAlbums";
import { getAlbum } from "../api/getAlbum";

interface ITrackPage {
  trackID: string;
  albumID: string;
  artistID: string;
  randomColor: string;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  setAlbumID: React.Dispatch<React.SetStateAction<string>>;
  setHeaderName: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
}

export let currentTopTracks: IArtistsTopTrecks;

function TrackPage({
  trackID,
  albumID,
  artistID,
  randomColor,
  setTrackID,
  setArtistID,
  setAlbumID,
  setHeaderName,
  setRandomColor,
}: ITrackPage) {
  const token = window.localStorage.getItem("token");
  const [track, setTrack] = useState<IResponseTrack | null>(null);
  const [topTracks, setTopTracks] = useState<IArtistsTopTrecks | null>(null);
  const [albums, setAlbums] = useState<IArtistsAlbums | null>(null);
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const audio = document.querySelector(".playback") as HTMLAudioElement;
  if (topTracks) {
    currentTopTracks = topTracks;
  }
  useEffect(() => {
    setHeaderName(track ? track.name : "");
    setArtistID(track ? track.album!.artists[0].id : "");

    if (track) {
      const foo = async () => {
        setTopTracks(
          await getArtistsTopTrack(token, track.album!.artists[0].id)
        );
        setAlbum(await getAlbum(token, track.album!.id));
        setAlbums(await getArtistsAlbums(token, track.artists[0].id));
      };
      foo();
    }
  }, [track]);

  useEffect(() => {
    if (trackID.length > 0) {
      const foo = async () => {
        setTrack(await getTrack(token, trackID));
      };
      foo();
    }
  }, [trackID]);

  const artistsAlbums = albums?.items.filter(
    (item) => item.album_type === "album"
  );

  const artistsSingles = albums?.items.filter(
    (item) => item.album_type === "single"
  );

  return track ? (
    <div className="track-page">
      <SongAlbumPlaylistPageHeader
        color={randomColor}
        image={track.album!.images[0].url}
        title={"song"}
        name={track.name}
        age={track.album!.release_date.slice(0, 4)}
        owner={track.album!.artists[0].name}
        duration={track.duration_ms}
      />

      <div className="tracklist-table">
        <PageControlPanel color={randomColor} setIconHeart={true} track={track} />
      </div>

      <div className="popular-tracks">
        <div className="popular-tracks_title">Popular Tracks by</div>
        <div className="popular-tracks_artist">
          {track.album!.artists[0].name}
        </div>

        {topTracks ? (
          topTracks.tracks.length > 0 ? (
            topTracks.tracks.map((item, index) => (
              <TracklistRow
                key={`${item.name}${Math.random()}`}
                number={index + 1}
                image={item.album!.images[0].url}
                name={item.name}
                trackID={item.id}
                setTrackID={setTrackID}
                duration={item.duration_ms}
                setRandomColor={setRandomColor}
                isPlaying={item.id === audio.dataset.track_id ? true : false}
              />
            ))
          ) : (
            <p className="no-tracks_ad">Sorry... No trial version of tracks</p>
          )
        ) : (
          ""
        )}
      </div>

      <ArtistsAlbumsBlock
        albums={artistsAlbums}
        albumID={albumID}
        setAlbumID={setAlbumID}
        artistID={artistID}
        artistName={track.album!.artists[0].name}
        setRandomColor={setRandomColor}
      />

      <ArtistsAlbumsBlock
        albums={artistsSingles}
        albumID={albumID}
        setAlbumID={setAlbumID}
        artistID={artistID}
        artistName={track.album!.artists[0].name}
        setRandomColor={setRandomColor}
      />

      <div className="traks-from-album">
        <div className="traks-from-album_header">
          <img
            src={track.album!.images[0].url}
            alt="cover"
            className="traks-from-album_img"
          />
          <div className="traks-from-album_dscr">
            <div className="traks-from-album_title">From the album</div>
            <div className="traks-from-album_name">{track.album!.name}</div>
          </div>
        </div>

        {album ? (
          album.tracks.items.length > 0 ? (
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
              />
            ))
          ) : (
            <p className="no-tracks_ad">Sorry... No trial version of tracks</p>
          )
        ) : (
          ""
        )}

        <div className="copyrights">
          <div className="copyrights-date">
            {getCopyrightsDate(album ? album.release_date : "")}
          </div>
          <div className="copyrights-text">
            {" "}
            &#169;
            {album
              ? album.copyrights.length
                ? album.copyrights[0].text
                : ""
              : ""}
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

export default TrackPage;
