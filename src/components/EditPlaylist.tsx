import React, { useState, useEffect } from 'react'
import { IconCancel } from '../icons'
import { changePlaylistDetails } from '../api/changePlaylistDetails';
import { getUserPlaylist } from '../api/getUserPlaylist';

interface IEditPlaylist {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  modalActive: boolean;
  playlistID?: string;
  userId: string;
  setMyPlaylists?: React.Dispatch<React.SetStateAction<[]>>;
  createNewPlaylist?: (name: string, description: string) => void;

  name?: string;
  description?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  setDescription?: React.Dispatch<React.SetStateAction<string>>;
}

function EditPlaylist({setModalActive, modalActive, playlistID, userId, setMyPlaylists, createNewPlaylist}: IEditPlaylist) {
  const token = window.localStorage.getItem('token');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const inputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const textareaHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const setDetails = async () => {
    if(playlistID) {
      await changePlaylistDetails(token, playlistID, name, description)
    } else if(createNewPlaylist) {
      createNewPlaylist(name, description)
    }
  
    if(setMyPlaylists) {
      setMyPlaylists(await getUserPlaylist(token, userId))
    }
    setModalActive(!modalActive)
  }

  return (
    <div className={modalActive ? 'playlist-editor-modal' : 'playlist-editor-modal playlist-editor-modal--hidden'}>
        <div className='playlist-editor'>
            <div className='playlist-editor__top'>
                <h3 className='playlist-editor__header'>Edit details</h3>
                <button 
                  className='playlist-editor__cancel-btn btn-reset'
                  onClick={() => setModalActive(!modalActive)}  
                >
                  <IconCancel/>
                </button>
            </div>
            <input 
              className='playlist-editor__input' 
              type="text" 
              placeholder='New Playlist'
              onChange={inputHandle}  
            />
            <textarea 
              className='playlist-editor__description' 
              name="" 
              id="" 
              placeholder='Add an optional description'
              onChange={textareaHandle}
            ></textarea>
            <button 
              className='playlist-editor__btn btn-reset'
              onClick={setDetails}
            >
              Save
            </button>
        </div>
    </div>
  )
}

export default EditPlaylist