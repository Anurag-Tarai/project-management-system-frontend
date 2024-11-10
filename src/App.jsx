import { useState } from 'react'
import './App.css'
import Home from './pages/home/Home.jsx'
import Navbar from './pages/navbar/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Home/>
    </>
  )
}

export default App
