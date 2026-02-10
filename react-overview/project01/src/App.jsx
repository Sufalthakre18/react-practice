import './App.css'
import profiles from './assets/profiles'
import ProfileList from './components/ProfileList'
function App() {
 
  return (
    <>
     <ProfileList data={profiles}/>
    </>
  )
}

export default App
