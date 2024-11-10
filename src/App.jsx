import { useState } from 'react'
import './App.css'
import Home from './pages/home/Home.jsx'
import Navbar from './pages/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDetails from './pages/project-details/ProjectDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/project/:id' element={<ProjectDetails/>}/>
    </Routes>
    </>
  )
}

export default App
