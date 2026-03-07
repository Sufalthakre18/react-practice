import React from 'react'
import { useParams } from 'react-router-dom'

function Man() {
    const params=useParams()
    console.log(params);
    console.log(params.id);
    
    
  return (
    <div><h1>Man's Collection</h1></div>
  )
}

export default Man