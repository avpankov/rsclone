import axios from 'axios'
import React from 'react'

export async function removePlaylist(playlistId: string, token: string | null) {
  await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
  })
}
