import axios from 'axios'
import React from 'react'

export async function changePlaylistDetails(token: string | null, playlistId: string, name: string, description: string) {
    await axios({
        method: 'put',
        url: `https://api.spotify.com/v1/playlists/${playlistId}`,
        headers: {Authorization: `Bearer ${token}`},
        data: {
            "name": name,
            "description": description,
        }
    })
}
