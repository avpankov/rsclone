import axios from "axios";

export async function getPlaylists(token: string | null, playlistID: string) {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const filteredTracks = data.tracks.items.filter((item: { track: {preview_url: null;} }) => item.track.preview_url !== null);
  data.tracks.items = filteredTracks;
  return data;
}
