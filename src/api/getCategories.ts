import axios from "axios";

export async function getCategories(token: string | null){
  const { data } = await axios.get(`https://api.spotify.com/v1/browse/categories`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      limit: 30,
      country: 'BY',
      locale: 'en',
    }
  })
  return data.categories.items;
}
