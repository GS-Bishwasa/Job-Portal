import React, { useState } from 'react'
import Navbar from '../componenets/Navbar'
import { assets } from '../assets/assets'
import moment from 'moment'
import Footer from '../componenets/Footer'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'

const Application = () => {

  const { user } = useUser()
  const { getToken } = useAuth()

  const [isEdit, setisEdit] = useState(false)
  const [resume, setresume] = useState(null)

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const updateResume = async () => {
    try {
      const formData = new FormData()
      formData.append('resume', resume)
      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/users/update-resume', formData, { 
        headers: { Authorization: `Bearer ${token}` } 
      })
      
      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

    setisEdit(false)
    setresume(null)
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications()
    }
  }, [user])

  return (
    <>
      <Navbar />
      <div className='conatiner px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        {/* Resume Part */}
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit || userData && userData.resume === ""
              ? <>
                <label className='flex items-center ' htmlFor="resumeUpload">
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>
                    {resume ? resume.name : "Select Resume"}
                  </p>
                  <input 
                    id='resumeUpload' 
                    onChange={(e) => setresume(e.target.files[0])} 
                    accept='application/pdf' 
                    type="file" 
                    hidden 
                  />
                  <img src={assets.profile_upload_icon} alt="" />
                </label>
                <button 
                  onClick={updateResume} 
                  className='bg-green-100 border border-green-600 px-4 py-2 rounded-lg'
                >
                  Save
                </button>
              </> 
              : <div className='flex gap-2'>
                <a 
                  className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' 
                  target='_blank' 
                  href={userData?.resume}
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
                <button 
                  className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2' 
                  onClick={() => setisEdit(true)}
                >
                  Edit
                </button>
              </div>
          }
        </div>

        {/* Jobs Applied Part */}
        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
        
        {userApplications.length === 0 ? (
          <div className='text-center py-10 text-gray-500'>
            <p>No applications yet. Start applying to jobs!</p>
          </div>
        ) : (
          <table className='min-w-full bg-white border rounded-lg'>
            <thead>
              <tr>
                <th className='py-3 px-4 border text-left'>Company</th>
                <th className='py-3 px-4 border text-left'>Job Title</th>
                <th className='py-3 px-4 border text-left max-sm:hidden'>Location</th>
                <th className='py-3 px-4 border text-left max-sm:hidden'>Date</th>
                <th className='py-3 px-4 border text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications
                .filter(job => job.companyId && job.jobId) // Filter out applications with null references
                .map((job, index) => (
                  <tr key={index}>
                    <td className='py-3 px-4 flex items-center gap-2 border-b'>
                      <img className='w-8 h-8' src={job.companyId.image} alt="" />
                      {job.companyId.name}
                    </td>
                    <td className='py-2 px-4 border-b'>{job.jobId.title}</td>
                    <td className='py-2 px-4 border-b max-sm:hidden'>{job.jobId.location}</td>
                    <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                    <td className='py-2 px-4 border-b'>
                      <span className={`px-4 py-1.5 rounded ${
                        job.status === 'Accepted' 
                          ? 'bg-green-100 text-green-700' 
                          : job.status === 'Rejected' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Application