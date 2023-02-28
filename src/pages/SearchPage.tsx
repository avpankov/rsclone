import React, { useEffect, useState } from "react";
import {
  ICategory,
  ISearchResult,
} from "../components/interfaces/apiInterfaces";
import { SearchIcon } from "../icons";
import { searchItems } from "../api/searchItems";
import { getCategories } from "../api/getCategories";
import CategoryCard from "../components/CategoryCard";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import TracksSearchPage from "./TracksSearchPage";
import AllSearchPage from "./AllSearchPage";
import ArtistsSearchPage from "./ArtistsSearchPage";
import AlbumsSearchPage from "./AlbumsSearchPage";

interface ISearchPage {
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
  setAlbumID: React.Dispatch<React.SetStateAction<string>>;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  setTrackID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  setCategoryID: React.Dispatch<React.SetStateAction<string>>;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
}

function SearchPage({
  setPlaylistsID,
  setAlbumID,
  setArtistID,
  setTrackID,
  setRandomColor,
  setCategoryID,
  setCategoryName,
}: ISearchPage) {
  const token = window.localStorage.getItem("token");
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function foo() {
      if (window.sessionStorage.getItem('searchKey')) {
        setSearchKey((window.sessionStorage.getItem('searchKey') || ''));
        setSearchResult(await searchItems(window.sessionStorage.getItem('searchKey') || '', token));
      }
    };
    foo();
  }, []);

  useEffect(() => {
    async function foo() {
      setCategories(await getCategories(token));
    }
    foo();
  }, [token]);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchKey === "") navigate("/search");
  }, [searchKey, navigate]);

  function toggleTagClass(e: React.MouseEvent<Element, MouseEvent>) {
    const links = Array.from(document.querySelectorAll(".search-tag"));
    links.forEach((link) => {
      link.classList.remove("search-tag_active");
    });
    (e.target as HTMLLinkElement).classList.add("search-tag_active");
  }

  function renderSearchResult() {
    return (
      <>
        {searchResult && (
          <>
            {searchResult.artists.items.length === 0 ? (
              <div className="no-results">
                <h2>No results found.</h2>
                <p>
                  Please make sure your words are spelled correctly or use less
                  or different keywords.
                </p>
              </div>
            ) : (
              <>
                <div className="search-tags">
                  <Link
                    to=""
                    className="search-tag search-tag_active"
                    onClick={(e) => toggleTagClass(e)}
                  >
                    All
                  </Link>
                  <Link
                    to={`${searchKey}/artists`}
                    className="search-tag"
                    onClick={(e) => toggleTagClass(e)}
                  >
                    Artists
                  </Link>
                  <Link
                    to={`${searchKey}/tracks`}
                    className="search-tag"
                    onClick={(e) => toggleTagClass(e)}
                  >
                    Songs
                  </Link>
                  <Link
                    to={`${searchKey}/albums`}
                    className="search-tag"
                    onClick={(e) => toggleTagClass(e)}
                  >
                    Albums
                  </Link>
                </div>
                <Routes>
                  <Route
                    path=""
                    element={
                      <AllSearchPage
                        searchResult={searchResult}
                        setPlaylistsID={setPlaylistsID}
                        setRandomColor={setRandomColor}
                        setAlbumID={setAlbumID}
                        setTrackID={setTrackID}
                        setArtistID={setArtistID}
                      />
                    }
                  />
                  <Route
                    path=":searchKey/artists"
                    element={
                      <ArtistsSearchPage
                        searchKey={searchKey}
                        setArtistID={setArtistID}
                        setRandomColor={setRandomColor}
                      />
                    }
                  />
                  <Route
                    path=":searchKey/tracks"
                    element={
                      <TracksSearchPage
                        searchKey={searchKey}
                        setTrackID={setTrackID}
                        setAlbumID={setAlbumID}
                        setArtistID={setArtistID}
                        setRandomColor={setRandomColor}
                      />
                    }
                  />
                  <Route
                    path=":searchKey/albums"
                    element={
                      <AlbumsSearchPage
                        searchKey={searchKey}
                        setAlbumID={setAlbumID}
                        setRandomColor={setRandomColor}
                      />
                    }
                  />
                </Routes>
              </>
            )}
          </>
        )}
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
            placeholder={window.sessionStorage.getItem('searchKey') || "What do you want to listen to?"}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={async () => {
              setSearchResult(await searchItems(searchKey, token));
              window.sessionStorage.setItem('searchKey', searchKey);
            }
            }
          />
        </label>
      </form>
      {searchResult ? (
        renderSearchResult()
      ) : (document.querySelector(".search__input") as HTMLInputElement) !==
        null &&
        (document.querySelector(".search__input") as HTMLInputElement).value ===
        "" ? (
        <>
          <h3 className="search__cards-title">Browse all</h3>
          <div className="search__cards">
            {categories.length > 0
              ? categories.map((category: ICategory) => {
                return (
                  <Link
                    to={`/section/${category.id}`}
                    onClick={() => {
                      setCategoryID(category.id);
                      setCategoryName(category.name);
                    }}
                    key={category.name}
                  >
                    <CategoryCard
                      image={category.icons[0].url}
                      name={category.name}
                      key={category.name}
                    />
                  </Link>
                );
              })
              : ""}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchPage;
