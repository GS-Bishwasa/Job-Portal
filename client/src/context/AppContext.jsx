import { createContext, useEffect, useState } from "react"
import { toast } from 'react-toastify';
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

const AppContext = createContext()

export const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { user } = useUser()
  const { getToken } = useAuth()

  const [searchFilter, setsearchFilter] = useState({
    title: '',
    location: ''

  })
  const [isSearched, setisSearched] = useState(false)
  const [jobs, setjobs] = useState([])

  const [showRecriterLogin, setshowRecriterLogin] = useState(false)

  const [companyToken, setcompanyToken] = useState(null)
  const [companyData, setcompanyData] = useState(null)

  const [userData, setuserData] = useState(null)
  const [userApplications, setuserApplications] = useState([])

  //   function to fetch job data
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/jobs')
      if (data.success) {
        setjobs(data.jobs)
        console.log(data.jobs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })
      if (data.success) {
        setcompanyData(data.company)
        console.log(data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  // Function to fetch user data
  const fetchUserData = async () => {
    try {
     const token = await getToken({ skipCache: true })
      const { data } = await axios.get(backendUrl + '/api/users/user', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        // console.log(data.user)
        setuserData(data.user)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  // Function to fetch user's applied applications data
  const fetchUserApplications = async () => {
    try {
     const token = await getToken({ skipCache: true })
      const { data } = await axios.get(backendUrl + '/api/users/applications', { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        setuserApplications(data.applications)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchJobs()
    const storedCompanyToken = localStorage.getItem("companyToken")

    if (storedCompanyToken) {
      setcompanyToken(storedCompanyToken)
    }
  }, [])

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData()
    }
  }, [companyToken])



  useEffect(() => {
    if (user) {
      fetchUserData()
      fetchUserApplications()
    }
  }, [user])


  const value = {

    searchFilter, setsearchFilter,
    isSearched, setisSearched,
    jobs, setjobs,
    showRecriterLogin, setshowRecriterLogin,
    companyToken, setcompanyToken,
    companyData, setcompanyData,
    backendUrl,
    userData, setuserData,
    userApplications, setuserApplications,
    fetchUserData,
    fetchUserApplications

  }
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

export default AppContext;   