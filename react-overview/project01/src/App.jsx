import './App.css'
import profiles from './assets/profiles'
import ProfileList from './components/project1/ProfileList.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Project2 from './components/project2/Project2';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/project1" element={<ProfileList data={profiles}/>} />
        <Route path="/project2" element={<Project2/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
