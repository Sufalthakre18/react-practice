import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import NotFound from "./pages/NotFound"
import Product from "./pages/Product"
import Man from "./pages/Man"
import Woman from "./pages/Woman"
import Navbar2 from "./components/Navbar2"

function App() {

  return (
    <>
      <Navbar />
      <Navbar2/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product/>}>
            <Route path="man/:id" element={<Man/>} />
            <Route path="woman" element={<Woman/>} />
        </Route>
        
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>

  )
}

export default App
