import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import uploadfile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast'

const RegisterPage = () => {
  const [data,setData] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic: ''
  })
  const [uploadPhoto, setUploadPhoto] = useState('')
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


  const handleUpload = async (e) => {
    const file = e.target.files[0]
    const uploadPhoto = await uploadfile(file)
    setUploadPhoto(file)
    setData((prev)=>{
      return {
        ...prev,
        profile_pic : uploadPhoto?.url
      }
    }) 
  } 

  const closeMenu = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const response = await axios.post('http://localhost:4000/api/user/register', data)
      toast.success(response.data.message)
      if(response.data.success){
        setData({
          name: '',
          email: '',
          password: '',
          profile_pic: ''
        })
navigate('/email')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
 
  return (
    <div className='mt-20'>
      <div className='bg-white w-full max-w-md mx:2 p-4 rounded overflow-hidden md:mx-auto'>
        <h3>Welcome to Chat app!</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name:</label>
            <input 
            type="text" 
            id='name'
            name='name'
            placeholder='Enter your name'
            className='bg-slate-100 px-2 py-1 focus:outline-secondary'
            value={data.name}
            onChange={handleOnChange}
            required
            />
          </div>

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

          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>Photo:
              <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-secondary cursor-pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {
                    uploadPhoto?.name ? uploadPhoto?.name :  "Upload profile photo"
                  } 
                </p>
                {
                  uploadPhoto?.name && (
                <button className='text-lg ml-2 hover:text-red-600' onClick={closeMenu}>
                <IoIosClose />
                </button>
                  )
                }
              </div>
            </label>
            <input 
            type="file" 
            id='profile_pic'
            name='profile_pic'
            className='bg-slate-100 px-2 py-1 focus:outline-secondary hidden'
            onChange={handleUpload}
            />
          </div>
 
          <button 
          className='bg-primary text-lg px-4 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
          Register
          </button>
        </form>
        <div>
          <p className='my-3 text-center'>Already have account ? <Link to={'/email'} className='hover
          text-primary font-semibold'>Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
