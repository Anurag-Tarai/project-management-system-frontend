import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/home/Home.jsx'
import Navbar from './pages/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDetails from './pages/project-details/ProjectDetails'
import IssueDetails from './pages/IssueDetails/IssueDetails'
import Auth from './pages/auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { store } from './redux/Store'
import { getUser } from './redux/auth/Action'

function App() {
      const dispatch = useDispatch();
      const {auth} = useSelector(store=>store)

      useEffect(()=>{
        dispatch(getUser())
      },[auth.jwt])

      console.log("from app.jsx auth", auth);
      

  return (
    <>
   
    {
      auth.user? <div>
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
