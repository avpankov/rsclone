import React from "react";
import { convertTotalTime, convertTrackTime } from "../utils/utils";

interface IPageHeader {
  color: string;
  image: string;
  title: string;
  name: string;
  description?: string;
  owner?: string;
  followers?: string | number;
  age?: string;
  tracks?: number;
  durationTotal?: number;
  duration?: number;
  circle?: boolean;
}

function SongAlbumPlaylistPageHeader({
  color,
  image,
  title,
  name,
  description,
  owner,
  followers,
  age,
  tracks,
  durationTotal,
  duration,
  circle,
}: IPageHeader) {
  return (
    <div
      className="page-header"
      style={{
        backgroundColor: color,
      }}
    >
      <img
        src={image}
        alt="cover"
        className="page-header_cover"
        crossOrigin="anonymous"
        style={circle ? { borderRadius: "50%" } : { borderRadius: "none" }}
      />
      <div className="page-header_item">
        <h2 className="page-header_title">{title}</h2>
        <h1 className="page-header_name">{name}</h1>
        <p className="page-header_dscr">{description}</p>
        <div className="page-header_info">
          <span className="page-header_owner">
            {owner ? `${owner} • ` : ""}
          </span>
          <span className="page-header_followers">
            {followers ? followers : ""}
          </span>
          <span className="page-header_age">{age ? age : ""}</span>
          <span className="page-header_tracks">
            {tracks ? ` • ${tracks} songs` : ""}
          </span>
          <span className="page-header_total-duration">
            {durationTotal ? (
              <span>
                ,{" "}
                <span className="page-header__total-duration-time">{`${convertTotalTime(
                  durationTotal
                )}`}</span>
              </span>
            ) : (
              ""
            )}
          </span>
          <span className="page-header_duration">
            {duration ? `${convertTrackTime(duration)}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SongAlbumPlaylistPageHeader;
