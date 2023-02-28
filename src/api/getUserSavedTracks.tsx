import React from 'react'
import axios from 'axios';

export async function getUserSavedTracks(token: string | null) {
    const { data } = await axios.get(
        `https://api.spotify.com/v1/me/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );
    return data
}
