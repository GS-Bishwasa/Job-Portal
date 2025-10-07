import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/application'
import ApplyJob from './pages/ApplyJob'
import RecruiterLogin from './componenets/RecruiterLogin'
import AppContext from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css' 


function App() {
  const {showRecriterLogin} = useContext(AppContext)
  console.log(showRecriterLogin)

  return (
    <>
   {showRecriterLogin &&  <RecruiterLogin />}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/application' element={<Application />} />
      <Route path='/apply-job/:id' element={<ApplyJob />} />
      <Route path='/dashboard' element={<Dashboard />}> 
        <Route path='add-job' element={<AddJob/>}/>
        <Route path='manage-jobs' element={<ManageJobs/>}/>
        <Route path='view-applications' element={<ViewApplications/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
