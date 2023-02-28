import React from 'react'
import axios from 'axios'

export async function removeTrackFromSaved(token: string | null, id: string) {
    await axios({
        method: 'delete',
        url: 'https://api.spotify.com/v1/me/tracks',
        headers: {Authorization: `Bearer ${token}`},
        data: {
            ids: [
                id
            ]
        }
    })
}
