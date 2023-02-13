import React, { useEffect, useState } from 'react'
import { ICategory, ISearchResult } from '../components/interfaces/apiInterfaces';
import Mix from '../components/Mix';
import SearchResultArtist from '../components/view/SearchResultArtist';
import SearchResultSong from '../components/view/SearchResultSong';
import { SearchIcon } from '../icons'
import { searchItems } from '../api/searchItems';
import { getCategories } from '../api/getCategories';
import CategoryCard from '../components/CategoryCard';
import { convertTrackTime } from '../utils/utils';
import { Link, Route, Router, Routes } from 'react-router-dom';
import TracksSearchPage from './TracksSearchPage';
import AllSearchPage from './AllSearchPage';
import ArtistsSearchPage from './ArtistsSearchPage';
import AlbumsSearchPage from './AlbumsSearchPage';



function SearchPage() {
  const token = window.localStorage.getItem("token");
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
  const [playlistID, setPlaylistsID] = useState<string>("");
  const [randomColor, setRandomColor] = useState<string>("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function foo() {
      setCategories(await getCategories(token));
    }
    foo();
  }, []);

  function renderSearchResult() {

    return (
      <>
        {searchResult &&
          <>
            {searchResult.artists.items.length === 0
              ? <div className='no-results'>
                <h2>No results found.</h2>
                <p>Please make sure your words are spelled correctly or use less or different keywords.</p>
              </div>
              : <>
                <div className="search-tags">
                  <Link to="" className='search-tag search-tag_active'>All</Link>
                  <Link to={`${searchKey}/artists`} className='search-tag'>Artists</Link>
                  <Link to={`${searchKey}/tracks`} className='search-tag'>Songs</Link>
                  <Link to={`${searchKey}/albums`} className='search-tag'>Albums</Link>
                </div>
                <Routes>
                  <Route path="" element={<AllSearchPage searchResult={searchResult} setPlaylistsID={setPlaylistsID}
                    setRandomColor={setRandomColor} />} />
                  <Route path=":searchKey/artists" element={<ArtistsSearchPage searchKey={searchKey} setPlaylistsID={setPlaylistsID}
                    setRandomColor={setRandomColor} />} />
                  <Route path=":searchKey/tracks" element={<TracksSearchPage searchKey={searchKey} />} />
                  <Route path=":searchKey/albums" element={<AlbumsSearchPage searchKey={searchKey} setPlaylistsID={setPlaylistsID}
                    setRandomColor={setRandomColor} />} />
                </Routes>

              </>
            }
          </>
        }
      </>
    );
  }

  return (
    <div className="search">
      <form className="search__form">
        <label className="search__label">
          <SearchIcon className="search__svg" />
          <input
            className="search__input"
            type="text"
            placeholder="What do you want to listen to?"
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={async () =>
              setSearchResult(await searchItems(searchKey, token))
            }
          />
        </label>
      </form>
      {searchResult
        ? (renderSearchResult())
        :
        (document.querySelector('.search__input') as HTMLInputElement) !== null &&
          (document.querySelector('.search__input') as HTMLInputElement).value === ''
          ? <>
            <h3 className='search__cards-title'>Browse all</h3>
            <div className="search__cards">
              {categories.length > 0
                ? categories.map((category: ICategory) => {
                  return <CategoryCard image={category.icons[0].url} name={category.name} key={category.name} />
                })
                : ""}
            </div>
          </>
          : (
            ""
          )}
    </div>
  );
}

export default SearchPage;
