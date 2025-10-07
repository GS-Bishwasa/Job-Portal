import React, { use } from 'react'
import { assets } from '../assets/assets'
import { useUser, UserButton, useClerk, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AppContext from '../context/AppContext'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const Navigate = useNavigate()

  const {setshowRecriterLogin,showRecriterLogin} = useContext(AppContext)

  return (
    <div className="shadow py-4">
      <div className="container mx-auto px-4 2xl:px-20 flex justify-between items-center">
         <img className="cursor-pointer" onClick={()=> Navigate('/')} src={assets.logo} alt="logo" />
       
       

        <SignedIn>
          <div className="flex items-center gap-3">
            <Link to="/application">Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {user?.firstName} {user?.lastName}</p>
            {/* Clerk's built-in user menu */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex items-center gap-4 max-sm:text-xs">
            <button onClick={()=> setshowRecriterLogin(true)} className="text-gray-600">Recruiter Login</button>
            <button
              onClick={() => openSignIn()}
              className="rounded-full sm:px-9 gap-2 px-4 py-2 bg-blue-600 text-white"
            >
              Login
            </button>
          </div>
        </SignedOut>
      </div>
    </div>
  )
}

export default Navbar
