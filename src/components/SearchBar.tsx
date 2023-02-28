import React from 'react'
import { SearchIcon } from '../icons'

function SearchBar() {
  return (
    <form className='search__form'>
       <label className='search__label'>
          <SearchIcon className='search__svg'/>
        <input className='search__input' type="text" placeholder='What do you want to listen to?' />
        <button type={"submit"}>Search</button>
       </label>
    </form>
  )
}

export default SearchBar
