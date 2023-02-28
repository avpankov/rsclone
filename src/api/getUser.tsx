import axios from "axios";

export async function getUser(token: string | null) {
  const { data } = await axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  return data.display_name
}
