import React from 'react'

function Avatar({image}) {
  return (
    <div className='image'>
        <img src={image} alt='profile' />
    </div>
  )
}

export default Avatar