import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'


const JobListing = () => {
    const { searchFilter, isSearched, setsearchFilter, jobs } = useContext(AppContext)


    const [showFilter, setshowFilter] = useState(true)
    const [currentPage, setcurrentPage] = useState(1)
    const [SelectedCategories, setSelectedCategories] = useState([])
    const [SelectedLocations, setSelectedLocations] = useState([])

    const [filteredJobs, setfilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category])
    }
    const handleLocationChange = (location) => {
        setSelectedLocations(prev => prev.includes(location) ? prev.filter(loc => loc !== location) : [...prev, location])
    }

    useEffect(() => {
        const matchesCategory = job => SelectedCategories.length === 0 || SelectedCategories.includes(job.category)
        const matchesLocation = job => SelectedLocations.length === 0 || SelectedLocations.includes(job.location)
        const matchesTitle = job => searchFilter.title === '' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchesSearchLocation = job => searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job))
        setfilteredJobs(newFilteredJobs)
        setcurrentPage(1)
    }, [SelectedCategories, SelectedLocations, searchFilter, jobs])

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg-space-y-8 py-8'>

            {/* Sidebar */}
            <div className='w-full lg:w-1/4 px-4 bg-white'>
                {/* Search Filter From hero componenet */}
                {
                    isSearched && (searchFilter.title !== '' || searchFilter.location !== '') && (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Seatch</h3>
                            <div className='mb-4 text-gray-600 '>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{searchFilter.title}
                                        <img onClick={() => setsearchFilter(prev => ({ ...prev, title: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{searchFilter.location}
                                        <img onClick={() => setsearchFilter(prev => ({ ...prev, location: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }


                <button className='px-6 py-1.5 rounded border border-gray-400 lg:hidden' onClick={() => setshowFilter(prev => !prev)}>
                    {showFilter ? "Close" : "Filters"}
                </button>
                {/* Category Filter */}
                <div className={showFilter ? '' : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4 pt-14'>Search by Category</h4>
                    <ul className='space-y-2 text-gray-600'>
                        {JobCategories.map((category, index) => (
                            <li key={index} className='flex gap-3 items-center '>
                                <input className='scale-125' type="checkbox" onChange={() => handleCategoryChange(category)}
                                    checked={SelectedCategories.includes(category)}
                                /> {category}
                            </li>
                        ))}
                    </ul>
                </div>


                {/* Location Filter */}
                <div className={showFilter ? '' : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search by Location</h4>
                    <ul className='space-y-2 text-gray-600'>
                        {JobLocations.map((location, index) => (
                            <li key={index} className='flex gap-3 items-center '>
                                <input className='scale-125' type="checkbox" onChange={() => handleLocationChange(location)}
                                    checked={SelectedLocations.includes(location)}
                                /> {location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            {/* Job Listings */}
            <section className='w-full lg:w-3/4 max-lg:px-4 text-gray-800'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => {
                        return (
                            <JobCard key={index} job={job} />
                        )
                    })}
                </div>

                {/* Pagination */}
                {
                    filteredJobs.length > 0 && (
                        <div className='flex space-x-2 justify-center items-center mt-10'>
                            <a className={`p-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => currentPage == 1 ? setcurrentPage(1) : setcurrentPage(currentPage - 1)} href="#job-list">
                                <img src={assets.left_arrow_icon} alt="Previous" />
                            </a>
                            {
                                Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                                    <a href="#job-list" key={index}>
                                        <button onClick={() => setcurrentPage(index + 1)} className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'bg-gray-200 text-gray-600'}`}>{index + 1}</button>
                                    </a>
                                ))
                            }
                            <a onClick={() => setcurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} href="#job-list">
                                <img src={assets.right_arrow_icon} alt="Next" />
                            </a>
                        </div>
                    )
                }
            </section>

        </div>
    )
}

export default JobListing