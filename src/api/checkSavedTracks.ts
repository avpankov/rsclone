import axios from 'axios'
import React from 'react'

export async function checkSavedTracks(token: string | null, id: string) {
    let { data } = await axios.get(`https://api.spotify.com/v1/me/tracks/contains`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            ids: id
        }
    })
    
    return data
}
