import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeDataContext } from '../context/ThemeContext'

const Navbar2 = () => {

  let navigate = useNavigate();
  const [theme,setTheme]=useContext(ThemeDataContext);

  console.log(theme,setTheme);
    const changeTheme=()=>{
        setTheme(theme==='dark'? 'light':'dark')
    }
  
  return (
    <div className={`navbar2 ${theme}`}>
      <button
        onClick={() => navigate('/')}
        className="nav-btn"
      >
        Return to Home Page
      </button>

      <button
        onClick={() => navigate(-1)}
        className="nav-btn"
      >
        Back
      </button>

      <button
        onClick={() => navigate(1)}
        className="nav-btn"
      >
        Next
      </button>
      <button
        onClick={changeTheme}
        className="nav-btn"
      >
        {theme}
      </button>

    </div>
  )
}

export default Navbar2