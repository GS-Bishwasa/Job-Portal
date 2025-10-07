import { createContext, useEffect, useState } from "react"
import { jobsData } from "../assets/assets"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [searchFilter, setsearchFilter] = useState({
    title: '',
    location: ''
    
  })
  const [isSearched, setisSearched] = useState(false)
  const [jobs, setjobs] = useState([])

  const [showRecriterLogin, setshowRecriterLogin] = useState(false)

//   function to fetch job data
const fetchJobs = async () => {
setjobs(jobsData)
}

useEffect(() => {
    fetchJobs()
}, [])

const value  = {

    searchFilter,setsearchFilter,
    isSearched,setisSearched,
    jobs,setjobs,
    showRecriterLogin,setshowRecriterLogin
}
    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    )
    }

    export default AppContext;   