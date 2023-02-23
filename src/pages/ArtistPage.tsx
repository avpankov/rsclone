import React, { useEffect, useState } from "react";
import { getArtist } from "../api/getArtist";
import { getArtistsAlbums } from "../api/getArtistAlbums";
import { getArtistsTopTrack } from "../api/getArtistsTopTrack";
import { getRelatedArtists } from "../api/getRelatedArtists";
import ArtistBlock from "../components/ArtistBlock";
import ArtistsAlbumsBlock from "../components/ArtistsAlbumsBlock";
import {
  IArtistsAlbums,
  IArtistsTopTrecks,
  IRelativeArtists,
  IResponseArtist,
} from "../components/interfaces/apiInterfaces";
import PageControlPanel from "../components/PageControlPanel";
import SongAlbumPlaylistPageHeader from "../components/SongAlbumPlaylistPageHeader";
import TracklistRow from "../components/TracklistRow";
import { IconPreloader } from "../icons";
import { getSeparateByCommas } from "../utils/utils";

interface IArtistPage {
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

export let currentArtistTracks: IArtistsTopTrecks;

function ArtistPage({
  trackID,
  albumID,
  artistID,
  randomColor,
  setTrackID,
  setArtistID,
  setAlbumID,
  setHeaderName,
  setRandomColor,
}: IArtistPage) {
  const token = window.localStorage.getItem("token");
  const [artist, setArtist] = useState<IResponseArtist | null>(null);
  const [topTracks, setTopTracks] = useState<IArtistsTopTrecks | null>(null);
  const [albums, setAlbums] = useState<IArtistsAlbums | null>(null);
  const [relatedArtists, setRelatedArtist] = useState<IRelativeArtists | null>(
    null
  );
  if (topTracks) {
    currentArtistTracks = topTracks;
  }
  const audio = document.querySelector('.playback') as HTMLAudioElement;

  useEffect(() => {
    if (artistID.length > 0) {
      const foo = async () => {
        setArtist(await getArtist(token, artistID));
      };
      foo();
    }
  }, [artistID, token]);

  useEffect(() => {
    setHeaderName(artist ? artist.name : "");
    // setArtistID(artist ? artist.id : "");

    if (artist) {
      const foo = async () => {
        setTopTracks(await getArtistsTopTrack(token, artist.id));
        // setAlbum(await getAlbum(token, track.album.id));
        setAlbums(await getArtistsAlbums(token, artist.id));
        setRelatedArtist(await getRelatedArtists(token, artist.id));
      };
      foo();
    }
  }, [artist, setHeaderName, token]);

  const followers =
    String(artist?.followers ? artist.followers.total : "").length > 3
      ? getSeparateByCommas(
          String(artist?.followers ? artist.followers.total : "")
        )
      : artist?.followers
      ? artist.followers.total
      : "";

  return artist ? (
    <div className="artist-page">
      <SongAlbumPlaylistPageHeader
        color={randomColor}
        image={artist.images ? artist.images[0].url : ""}
        title={"artist"}
        name={artist.name}
        followers={`${followers} followers`}
        circle={true}
      />

      <div className="tracklist-table">
        <PageControlPanel color={randomColor} setIconHeart={false} topTracks={topTracks} />
      </div>

      <div className="popular-tracks">
        <div className="popular-tracks_title">Popular</div>
        {topTracks?.tracks.map((item, index) => (
          <TracklistRow
            key={`${item.name}${Math.random()}`}
            number={index + 1}
            image={item.album.images[0].url}
            name={item.name}
            trackID={item.id}
            setTrackID={setTrackID}
            duration={item.duration_ms}
            setRandomColor={setRandomColor}
            isPlaying={(item.id === audio.dataset.track_id) ? true : false}
          />
        ))}
      </div>

      <ArtistsAlbumsBlock
        albums={albums?.items}
        all={true}
        albumID={albumID}
        setAlbumID={setAlbumID}
        artistID={artistID}
        artistName={artist.name}
        setRandomColor={setRandomColor}
      />

      <ArtistBlock
        albums={relatedArtists?.artists.slice(0, 7)}
        artistID={artistID}
        setArtistID={setArtistID}
        artistName={artist.name}
        setRandomColor={setRandomColor}
        circle={true}
      />
    </div>
  ) : (
    <div>
      <IconPreloader width={50} height={50} />
    </div>
  );
}

export default ArtistPage;
