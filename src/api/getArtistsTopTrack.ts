import axios from "axios";

export async function getArtistsTopTrack(token: string | null, id: string) {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/artists/${id}/top-tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        market: "BY",
      },
    }
  );

  const filteredTracks = data.tracks.filter((item: { preview_url: null; }) => item.preview_url !== null);
  data.tracks = filteredTracks;
  return data;
}
