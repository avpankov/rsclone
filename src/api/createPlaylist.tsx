import axios from 'axios'
import React from 'react'

export async function createPlaylist(token: string | null, userId: string, name: string, description: string) {
    await axios({
        method: 'post',
        url: `https://api.spotify.com/v1/users/${userId}/playlists`,
        headers: {Authorization: `Bearer ${token}`},
        data: {
            "name": name,
            "description": description,
            "public": true
        }
    })
}
