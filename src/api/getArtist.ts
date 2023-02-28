import axios from "axios";

export async function getArtist(token: string | null, id: string) {
  const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      market: "BY",
    },
  });
  return data;
}
