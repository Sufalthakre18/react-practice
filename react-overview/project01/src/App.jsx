import './App.css'
import profiles from './assets/profiles'
import ProfileList from './components/project1/ProfileList.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Project2 from './components/project2/Project2';
import Project3 from './components/project3/Project3.jsx';
import Project4 from './components/project4/Project4.jsx';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/project1" element={<ProfileList data={profiles}/>} />
        <Route path="/project2" element={<Project2/>} />
        <Route path="/project3" element={<Project3/>} />
        <Route path="/project4" element={<Project4/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
