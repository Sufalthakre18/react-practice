import React from 'react'
import { BrowserRouter,Routes,Route, Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-amber-800 w-full flex p-5 justify-between'>
        <h1 className='uppercase text-xl'>Projects routes</h1>
        <ul className='text-black text-xs flex flex-row gap-4 m-2'>
            <li><Link to={'/project1'}>project1</Link></li>
            <li><Link to={'/project2'}>project2</Link></li>
            
        </ul>
    </div>
  )
}

export default Navbar