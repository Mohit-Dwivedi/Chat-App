import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import { PiUserCircle } from "react-icons/pi";

const CheckEmail = () => {
  const [data,setData] = useState({ 
    email: '', 
  }) 
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const response = await axios.post('http://localhost:4000/api/user/email', data)
      toast.success(response.data.message)
      if(response.data.success){
        setData({ 
          email: '', 
        })
       navigate('/password', {
        state: response?.data?.data
       })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
 
  return (
    <div className='mt-20'>
    <div className='bg-white w-full max-w-md mx:2 p-4 rounded overflow-hidden md:mx-auto'>

      <div className='w-fit mx-auto mb-2'>
        <PiUserCircle size={80}/>
      </div>

      <h3>Welcome to Chat app!</h3>

      <form className='grid gap-4 mt-3' onSubmit={handleSubmit}> 

        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>Email:</label>
          <input 
          type="text" 
          id='email'
          name='email'
          placeholder='Enter your email'
          className='bg-slate-100 px-2 py-1 focus:outline-secondary'
          value={data.email}
          onChange={handleOnChange}
          required
          />
        </div>  

        <button 
        className='bg-primary text-lg px-4 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
          Let's Go
        </button>
      </form>
      <div>
        <p className='my-3 text-center'>Nee User ? <Link to={'/register'} className='hover
        text-primary font-semibold'>Register</Link></p>
      </div>
    </div>
  </div>
  )
}

export default CheckEmail 
