import React from 'react'
import axios from 'axios';

export async function getUserPlaylist(token: string | null, userId: string) {
    const { data } = await axios.get(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );
    return data.items
}
