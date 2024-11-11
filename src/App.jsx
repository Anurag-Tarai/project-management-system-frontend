import { useState } from 'react'
import './App.css'
import Home from './pages/home/Home.jsx'
import Navbar from './pages/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDetails from './pages/project-details/ProjectDetails'
import IssueDetails from './pages/IssueDetails/IssueDetails'
import Auth from './pages/auth/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
    {
      false? <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/project/:id' element={<ProjectDetails/>}/>
        <Route path='/project/:projectId/issue/:issueId' element={<IssueDetails/>}/>
      </Routes>
      </div>:<Auth/>
    }
    </>
  )
}

export default App
