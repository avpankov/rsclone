import React, { useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon, IconPlayCard } from "../icons";
import ButtonMenu from "./ButtonMenu";
import { useAppSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";

enum Paths {
  playlist = "playlist",
  artist = "artist",
  album = "album",
  track = "track",
}

interface ISettingsBar {
  headerName: string;
}

function SettingsBar({ headerName }: ISettingsBar) {
  const navigate = useNavigate();
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(true);
  const [counterR, setCounterR] = useState(0);
  const [counterL, setCounterL] = useState(0);

  const goBack = () => {
    navigate(-1);
    setCounterL(counterL - 2);
    setCounterR(counterR + 1);
  };
  const goForward = () => {
    navigate(1);
    setCounterR(counterR - 1);
  };

  useEffect(() => {
    setCounterL(counterL + 1);
  }, [window.location.href]);

  useEffect(() => {
    if (counterL > 1) {
      setDisableLeft(false);
    } else if (counterL <= 1) {
      setDisableLeft(true);
    }

    if (counterR > 0) {
      setDisableRight(false);
    } else if (counterR <= 0) {
      setDisableRight(true);
    }
  }, [counterL, counterR]);

  const [activeMode, setActiveMode] = useState<string>("");

  const scrollHeight = useAppSelector((state) => state.scroll.scrollHeight);

  useEffect(() => {
    const path = window.location.hash.slice(
      2,
      window.location.hash.slice(2).indexOf("/") + 2
    );

    if (
      (scrollHeight > 360 && path === Paths.playlist) ||
      (scrollHeight > 360 && path === Paths.album) ||
      (scrollHeight > 360 && path === Paths.track) ||
      (scrollHeight > 360 && path === Paths.artist)
    ) {
      setActiveMode("active-bar");
    } else {
      setActiveMode("");
    }
  }, [scrollHeight]);

  return (
    <div className="settings-bar">
      <div className="settings-bar__block-left">
        <div className="settings-bar__arrows">
          <button
            className="arrow btn-reset"
            disabled={disableLeft}
            onClick={() => goBack()}
          >
            <ArrowLeftIcon className="arrow--left" />
          </button>
          <button
            className="arrow btn-reset"
            disabled={disableRight}
            onClick={() => goForward()}
          >
            <ArrowRightIcon className="arrow--right" />
          </button>
        </div>
        <div className={`settings-bar__control  ${activeMode}`}>
          {/* <div className="play-btn">
            <IconPlayCard height={24} width={24} />
          </div> */}
          <p className="playlist-name">{headerName}</p>
        </div>
      </div>
      <ButtonMenu />
    </div>
  );
}

export default SettingsBar;
