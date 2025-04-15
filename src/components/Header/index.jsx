import { Button } from '@mui/material'
import React from 'react'

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between'>
        {/* <img src="/logo.jpg" className='h-15'  alt="logo" /> */}
<h1 className='text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text 
bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
hover:from-yellow-400 hover:via-red-500 hover:to-pink-500 
transition-all duration-700 ease-in-out cursor-pointer'>AI Trip Planner (DEMO)</h1>
      <Button variant='contained'>Sign in</Button>
    </div>
  )
}

export default Header
