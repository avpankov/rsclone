import axios from 'axios'
import React from 'react'

export async function removeItemFromPlaylist(token: string | null, playlistId: string, uri: string) {
  await axios({
    method: 'delete',
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    headers: {Authorization: `Bearer ${token}`},
    data: {
        tracks: [
            {
                uri: uri
            }
        ]
    }
  })
}
