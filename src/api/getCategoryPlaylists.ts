import axios from "axios";

export async function getCategoryPlaylists(
  token: string | null,
  categoryID: string
) {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/browse/categories/${categoryID}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 10,
        country: "BY",
      },
    }
  );
  return data.playlists.items;
}
