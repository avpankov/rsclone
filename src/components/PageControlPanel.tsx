import React from "react";

import {
  IAlbum,
  IArtistsTopTrecks,
  IPlaylist,
  IResponseArtist,
  IResponseTrack,
} from "./interfaces/apiInterfaces";

interface IPageControlPanel {
  color: string;
  setIconHeart: boolean;
  playlist?: IPlaylist;
  track?: IResponseTrack;
  album?: IAlbum;
  topTracks?: IArtistsTopTrecks | null;
}

function PageControlPanel({
  color,
  setIconHeart,
  playlist,
  track,
  album,
  topTracks,
}: IPageControlPanel) {
  return (
    <div>
      <div
        className="tracklist-gradient"
        style={{
          background: `linear-gradient(0deg, #22222260 0, ${color} 500%)`,
        }}
      ></div>
      <div className="control-panel">
        {/* <div className="play-btn" onClick={() => {
          if (playlist) handleBigGreenButton(playlist.tracks.items[0].track.id);
          if (track) handleBigGreenButton(track.id);
          if (album) handleBigGreenButton(album.tracks.items[0].id);
          if (topTracks) handleBigGreenButton(topTracks.tracks[0].id);
        }
        }>
          <IconPlayCard height={28} width={28} />
        </div>
        {setIconHeart ? (
          <IconHeart height={32} width={32} className={"like-btn"} />
        ) : null} */}
      </div>
    </div>
  );
}

export default PageControlPanel;
