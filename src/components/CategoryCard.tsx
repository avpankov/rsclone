import React from 'react'

function CategoryCard(props: { name: string;  image: string}) {

  return (
    <a href='/' className='category-card' style={{backgroundColor: `#${Math.random().toString(16).slice(3, 9)}`}}>
        <div>
          <span className='category-card__title'>{props.name}</span>
          <img className='category-card__img' src={props.image} alt="" />
        </div>
    </a>
  )
}

export default CategoryCard
