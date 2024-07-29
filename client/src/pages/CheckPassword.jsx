import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import { PiUserCircle } from "react-icons/pi";
import Avatar from '../component/Avatar';
import {useDispatch} from 'react-redux'
import { setToken } from '../redux/userSlice';

const CheckPassword = () => {
  const [data,setData] = useState({ 
    password: '', 
  }) 
  const navigate = useNavigate()
  const location = useLocation() 
  const dispatch = useDispatch()

  // console.log(location)

  useEffect(() => {
    if(!location?.state?.name){
      navigate('/email')
    }
  }, [])
  
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
      const response = await axios({
        method: "post",
        url: 'http://localhost:4000/api/user/password',
        data: {
        userId: location?.state?._id,
        password: data.password
        },
        withCredentials: true
      })
      toast.success(response.data.message) 

      if(response.data.success){ 
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)
        setData({ 
          password: '', 
        })
        navigate('/')
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className='mt-20'>
    <div className='bg-white w-full max-w-md mx:2 p-4 rounded overflow-hidden md:mx-auto'>

      <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
        {/* <PiUserCircle size={80}/> */}
        <Avatar width={70} height={70} name={location?.state?.name} ImageUrl={location?.state?.profile_pic} userId={location?.state?._id}/>
        <h2 className='font-semibold text-lg mt-4'>{location?.state?.name}</h2>
      </div>

      <h3>Welcome to Chat app!</h3>

      <form className='grid gap-4 mt-3' onSubmit={handleSubmit}> 

      <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Password:</label>
            <input 
            type="text" 
            id='password'
            name='password'
            placeholder='Enter your password'
            className='bg-slate-100 px-2 py-1 focus:outline-secondary'
            value={data.password}
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
        <p className='my-3 text-center'><Link to={'/forgot-password'} className='hover
        text-primary font-semibold'>Forgot Password ?</Link></p>
      </div>
    </div>
  </div>
  )
}

export default CheckPassword  