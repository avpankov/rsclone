import { ISearchResult } from "../components/interfaces/apiInterfaces";
import Mix from "../components/Mix";
import SearchResultArtist from "../components/view/SearchResultArtist";
import SearchResultSong from "../components/view/SearchResultSong";
import { convertTrackTime } from "../utils/utils";
import { getUserPlaylist } from "../api/getUserPlaylist";
import { getUserId } from "../api/getUserId";
import { checkSavedTracks } from "../api/checkSavedTracks";
import React, { useEffect, useState } from "react";

interface ISearchPage {
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  setAlbumID: React.Dispatch<React.SetStateAction<string>>;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  searchResult: ISearchResult;
}

function AllSearchPage({
  setPlaylistsID,
  setRandomColor,
  setAlbumID,
  setTrackID,
  setArtistID,
  searchResult,
}: ISearchPage) {
  const [list, setList] = useState<[]>([]);
  const [strId, setStrId] = useState("");
  const [listIds, setListIds] = useState([]);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    setStrId(getTracksIds());
  }, [searchResult])

  function getTracksIds() {
    let ids = "";
    let index = 0;

    searchResult.tracks.items.forEach((item) => {
      if (index === 50) {
        return ids;
      }
      ids += item.id + ",";
      index++;
    });
    return ids;
  }

  useEffect(() => {
    if (strId.length > 0) {
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

  return (
    <div className="render-search-results">
      <div className="render-search-results__artist-and-track-container">
        <div className="search-result-artist__container">
          <div className="mixes-block-header">
            <p className="mixes-block-header-title">Artists</p>
          </div>
          <SearchResultArtist
            artistImage={
              searchResult.artists.items[0].images?.length
                ? searchResult.artists.items[0].images[0].url
                : "https://lab.possan.se/thirtify/images/placeholder-playlist.png"
            }
            artistName={searchResult.artists.items[0].name}
            artistID={searchResult.artists.items[0].id}
            setArtistID={setArtistID}
            setRandomColor={setRandomColor}
          />
        </div>
        <div className="search-result-songs__container">
          <div className="mixes-block-header">
            <p className="mixes-block-header-title">Songs</p>
          </div>
          {searchResult.tracks.items.slice(0, 4).map((item) => {
            return (
              <SearchResultSong
                image={item.album!.images[0].url}
                name={item.name}
                author={item.artists[0].name}
                artistID={item.artists[0].id}
                duration={convertTrackTime(item.duration_ms)}
                id={item.id}
                key={item.id + item.album!.images[0].url}
                setTrackID={setTrackID}
                setRandomColor={setRandomColor}
                setArtistID={setArtistID}
                list={list}
                addedTrack={listIds[searchResult.tracks.items.indexOf(item)]}
                uri={item.uri}
              />
            );
          })}
        </div>
      </div>
      <div className="render-search-results__albums">
        <div className="mixes-block-header">
          <p className="mixes-block-header-title">Albums</p>
        </div>
        <div className="mixes">
          {searchResult.albums.items.map((item) => (
            <Mix
              key={`${item.id}${Math.random()}`}
              image={item.images[0].url}
              name={item.artists[0].name}
              description={`${item.release_date.split("-")[0]} • ${item.name}`}
              albumID={item.id}
              setAlbumID={setAlbumID}
              setRandomColor={setRandomColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllSearchPage;
