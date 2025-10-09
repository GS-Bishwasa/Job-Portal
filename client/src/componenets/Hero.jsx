import { useContext, useRef } from 'react'
import React from 'react'
import { assets } from '../assets/assets'
import  AppContext  from '../context/AppContext'



const Hero = () => {

const { setsearchFilter, setisSearched } = useContext(AppContext)
const titleRef = useRef(null)
const locationRef = useRef(null)

const handleSearch = () => {

    setsearchFilter({ 
        title: titleRef.current.value, 
        location: locationRef.current.value
    })
    setisSearched(true)
   
  }

  return (
    <div className='container mx-auto px-4 2xl:px-20 my-10'>
        <div className='bg-gradient-to-r from-purple-800 to-slate-900 text-white p-16 text-center mx-2 flex flex-col gap-5 items-center justify-center rounded-[15px] py-16'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl mb-4 font-bold'>Over 10,000+ jobs to apply</h2>
            <p className='text-center text-[14px] mb-8 max-w-xl mx-auto px-5 font-light'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>

        <div className="bg-white text-gray-600 p-2 rounded flex flex-col xs:flex-row xs:flex-nowrap gap-2 items-stretch xs:items-center justify-between w-full max-w-xl mx-2 sm:mx-auto overflow-hidden">

  {/* Search Input */}
  <div className="flex items-center flex-1 min-w-0 border border-gray-200 rounded px-2">
    <img className="h-4 sm:h-5 mr-1 shrink-0" src={assets.search_icon} alt="" />
    <input
      ref={titleRef}
      type="text"
      placeholder="Search for jobs..."
      className="text-xs sm:text-sm p-2 rounded outline-none w-full min-w-0"
    />
  </div>

  {/* Location Input */}
  <div className="flex items-center flex-1 min-w-0 border border-gray-200 rounded px-2">
    <img className="h-4 sm:h-5 mr-1 shrink-0" src={assets.location_icon} alt="" />
    <input
      ref={locationRef}
      type="text"
      placeholder="Location"
      className="text-xs sm:text-sm p-2 rounded outline-none w-full min-w-0"
    />
  </div>

  {/* Search Button */}
  <button
    onClick={handleSearch}
    className="bg-blue-600 text-white px-3 sm:px-6 rounded py-2 text-xs sm:text-sm shrink-0 w-full xs:w-auto"
  >
    Search
  </button>

</div>



        </div>


        <div className='mt-5  text-center border border-gray-200 shadow-md flex  p-6 rounded-[15px]'>
            <div className='flex flex-wrap gap-10 justify-center  lg:gap-16 '>
                <p className='font-medium '>Trusted By</p>
                <img className='h-6' src={assets.microsoft_logo} alt="" />
                <img className='h-6' src={assets.walmart_logo} alt="" />
                <img className='h-6' src={assets.accenture_logo} alt="" />
                <img className='h-6' src={assets.samsung_logo} alt="" />
                <img className='h-6' src={assets.amazon_logo} alt="" />
                <img className='h-6' src={assets.adobe_logo} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Hero