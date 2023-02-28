import React from 'react'
import SearchBar from './SearchBar'
import ButtonMenu from './ButtonMenu'
import { ArrowRightIcon, ArrowLeftIcon } from '../icons'

function Header() {
  return (
    <header>
      <div className="header__block">
        <div className='header__block-left'>
          <div className="header__arrows">
            <button className='arrow btn-reset'><ArrowLeftIcon className='arrow--left'/></button>
            <button className='arrow btn-reset'><ArrowRightIcon className='arrow--right'/></button>
          </div>
          <SearchBar/>
        </div>
        <ButtonMenu/>
      </div>
    </header>
  )
}

export default Header