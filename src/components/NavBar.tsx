import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  IconSpotifyLogo,
  IconHome,
  IconHomeActive,
  IconSearch,
  IconSearchActive,
  IconAddPlayListIcon,
  IconLibrary,
  IconLibraryActive
} from "../icons";
import { getUserId } from "../api/getUserId";
import { createPlaylist } from '../api/createPlaylist';
import { getUserPlaylist } from '../api/getUserPlaylist';
import EditPlaylist from "./EditPlaylist";

interface IListItem {
  icon: React.SVGProps<SVGSVGElement>;
  activIcon?: React.SVGProps<SVGSVGElement>;
  name: string;
  page: string;
}

enum listItemNames {
  home = "Home",
  search = "Search",
  library = 'Your Library',
  createPlaylist = "Create Playlist",
}

enum listPages {
  home = '',
  search = 'search',
  library = 'library',
  createPlaylist = 'library'
}

enum iconColor {
  white = "white",
  black = "black",
}

interface INavBar {
  userId: string;
  myPlaylists: [];
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setMyPlaylists: React.Dispatch<React.SetStateAction<[]>>;
}

function NavBar({userId, myPlaylists, setUserId, setMyPlaylists}: INavBar) {
  const currentIconColor = iconColor.white;

  const listItem: IListItem[] = [
    {
      icon: <IconHome fill={currentIconColor} />,
      activIcon: <IconHomeActive fill={currentIconColor} />,
      name: listItemNames.home,
      page: listPages.home,
    },
    {
      icon: <IconSearch fill={currentIconColor} />,
      activIcon: <IconSearchActive fill={currentIconColor} />,
      name: listItemNames.search,
      page: listPages.search,
    },
    {
      icon: <IconLibrary />,
      activIcon: <IconLibraryActive fill={currentIconColor} />,
      name: listItemNames.library,
      page: listPages.library,
    },
    // {
    //   icon: <IconAddPlayListIcon fill={currentIconColor} />,
    //   activIcon: <IconAddPlayListIcon fill={currentIconColor} />,
    //   name: listItemNames.createPlaylist,
    //   page: listPages.createPlaylist,
    // },
  ];

  const [activeMode, setActiveMode] = useState<string>(listItem[0].name);

  const isActive = (item: IListItem): React.SVGProps<SVGSVGElement> =>
    item.name === activeMode
      ? (item.activIcon as React.SVGProps<SVGSVGElement>)
      : (item.icon as React.SVGProps<SVGSVGElement>);

  const token = window.localStorage.getItem('token');
  const [activeModal, setActiveModal] = useState(false)

  useEffect(() => {
    async function getUser() {
      setUserId(await getUserId(token))
    }
    getUser()
  }, [])

  const createNewPlaylist = async (name: string, description: string) => {
    await createPlaylist(token, userId, name, description);
    setMyPlaylists(await getUserPlaylist(token, userId))
  }

  return (
    <>
       <nav className="nav-bar">
        <div className="nav-bar_logo">
          <IconSpotifyLogo fill="white" stroke="white" />
        </div>
        <ul>
          {listItem.map((item) => (
            <li
              key={item.name}
              onClick={() => setActiveMode(item.name)}
              className={item.name === activeMode ? "active" : ""}
            >
              <NavLink to={item.page}>
                <>{isActive(item)}</>
                <p>{item.name}</p>
              </NavLink>
            </li>
          ))}
          <li 
            onClick={() => setActiveModal(!activeModal)}
          >
            <IconAddPlayListIcon/>
            <span>Create Playlist</span>
          </li>
        </ul>
      </nav>
      <EditPlaylist
        createNewPlaylist={createNewPlaylist}
        modalActive={activeModal}
        setModalActive={setActiveModal}
        userId={userId}
      />
    </>
   
  );
}

export default NavBar;
