
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import ThemeContext from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeContext>
      <App />
    </ThemeContext>

  </BrowserRouter>


)
