import React from 'react'
import logo from '../assets/logo.png'

const AuthLayout = ({children}) => {
  return (
    <>
      <header className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
        <img src={logo} width={100} height={60} alt="logo" />
      </header>
      {children}
    </>
  )
}

export default AuthLayout
