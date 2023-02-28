import axios from 'axios'
import React from 'react'

export async function saveTrackToPlaylist(token: string | null, id: string, uri: string) {
  await axios({
    method: 'post',
        url: `https://api.spotify.com/v1/playlists/${id}/tracks`,
        headers: {Authorization: `Bearer ${token}`},
        data: {
            uris: [
                uri
            ],
            position: 0
        }
  })
}
