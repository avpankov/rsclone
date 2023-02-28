import axios from 'axios'
import React from 'react'

export async function saveTrack(token: string | null, id: string) {
    await axios({
        method: 'put',
        url: 'https://api.spotify.com/v1/me/tracks',
        headers: {Authorization: `Bearer ${token}`},
        data: {
            ids: [
                id
            ]
        }
    })
}
