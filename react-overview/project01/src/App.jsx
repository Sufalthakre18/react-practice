import './App.css'
import Card from './components/Card'
import cardsData from './assets/data.json'
function App() {
 
  return (
    <>
     <Card cardsData={cardsData} />
    </>
  )
}

export default App
