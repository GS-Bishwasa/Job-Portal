import Quill from 'quill'
import React, { useEffect, useRef, useState } from 'react'
import { JobCategories,JobLocations } from '../assets/assets'
import axios from 'axios'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import { toast } from 'react-toastify/unstyled'


const AddJob = () => {

const [title, settitle] = useState('')
const [location, setlocation] = useState('Bangalore')
const [category, setcategory] = useState('Programming')
const [level, setlevel] = useState('Beginner level')
const [salary, setsalary] = useState(0)

const editorRef = useRef(null)
const quillref = useRef(null)

const {backendUrl,companyToken} = useContext(AppContext)


const onSubmitHandler = async (e)=>{
e.preventDefault()

try {
    
const description = quillref.current.root.innerHTML
const {data} = await axios.post(backendUrl+"/api/company/post-job",{title,description,location,salary,category,level},{headers:{token:companyToken}})

if (data.success) {
    toast.success(data.message)
    settitle('')
    setsalary(0)
    quillref.current.root.innerHTML = ""
}else{
    toast.error(data.message)
}

} catch (error) {
     toast.error(error.message)
}
}

useEffect(() => {
//   Initiate Quill Only Once
if (!quillref.current && editorRef.current) {
    quillref.current = new Quill(editorRef.current,{
        theme:'snow',
    })
}
}, [])


  return (
    <form onSubmit={onSubmitHandler} className='container p-4 flex flex-col w-full items-start gap-3'>
<div className='w-full'>
    <p className='mb-2'>Job Title</p>
    <input className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' onChange={e=> settitle(e.target.value)} type="text" value={title} placeholder='Type here' required/>
</div>

<div className='w-full max-w-lg'>
    <p className='my-2'>Job Description</p>
    <div ref={editorRef}>

    </div>
</div>


<div className='flex flex-col md:flex-row gap-2 w-full sm:gap-8'>
    <div>
        <p className='mb-2'>Job Category</p>
        <select className='w-full py-2 px-3 border-2 border-gray-300 rounded' onChange={e=>setcategory(e.target.value)}>
            {JobCategories.map((category,index)=>(
                <option key={index} value={category}>{category}</option>
            ))}
        </select>
    </div>
    <div>
        <p className='mb-2'>Job Location</p>
        <select className='w-full py-2 px-3 border-2 border-gray-300 rounded' onChange={e=>setlocation(e.target.value)}>
            {JobLocations.map((location,index)=>(
                <option key={index} value={location}>{location}</option>
            ))}
        </select>
    </div>
    <div>
        <p className='mb-2'>Job Level</p>
        <select className='w-full py-2 px-3 border-2 border-gray-300 rounded' onChange={e=>setlevel(e.target.value)}>
           <option value="Beginner Level">Beginner Level</option>
           <option value="Intermediate Level">Intermediate Level</option>
           <option value="Senior Level">Senior Level</option>
        </select>
    </div>
</div>

<div>
    <p className='mb-2'>Job Salary</p>
    <input min={0} className='w-full py-2 px-3 border-2 border-gray-300 rounded sm:w-[120px]' onChange={e=> setsalary(e.target.value)} type="number" placeholder='eg:- 25000'/>
</div>

<button className='w-28 py-3 mt-4 bg-black text-white rounded'>Add</button>
    </form>
  )
}

export default AddJob