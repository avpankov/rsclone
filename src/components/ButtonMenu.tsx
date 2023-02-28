import React from 'react'
import { ArrowDownIcon, ArrowUpIcon } from '../icons';
import { useEffect, useState } from 'react';
import { getUser } from './../api/getUser';


function ButtonMenu() {
  const token = window.localStorage.getItem('token');
  const [user, setUser] = useState('No Name');
  const [active, setActive] = useState(true);

  useEffect(() => {
    async function getUsername() {
      setUser(await getUser(token))
    };
    getUsername();
  }, [token])

  const logOut = () => {
    window.localStorage.removeItem("token")
    window.location.replace('http://localhost:3000/')
}

  return (
    <div className='menu'>
      <button className='button-menu btn-reset' onClick={() => setActive(!active)} >
          <div className="button-menu__avatar">
              <img src="" alt="" />
          </div>
          <span className="button-menu__name">{user}</span>
          {active ?
            <ArrowDownIcon className='button-menu__icon'/>
            : <ArrowUpIcon className='button-menu__icon'/>
          }
          
      </button>

      <div className={active ? 'modal hidden' : 'modal'} hidden>
        <button className='modal-btn btn-reset' onClick={logOut}>Log out</button>
      </div>
    </div>
  )
}

export default ButtonMenu
