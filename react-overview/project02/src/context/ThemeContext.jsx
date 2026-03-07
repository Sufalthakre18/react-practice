import React, { createContext, useState } from 'react'

export const ThemeDataContext=createContext()

function ThemeContext({children}) {

    
    const [theme, setTheme] = useState('dark')
    return (
        <ThemeDataContext.Provider value={[theme,setTheme]}>
            {children}
        </ThemeDataContext.Provider>
        
    )
}

export default ThemeContext