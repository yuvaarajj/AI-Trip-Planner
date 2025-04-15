import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-bold text-7xl text-center p-8'>
        <span className='text-amber-300 text-8xl'>

        Discover your next Adventure with AI:  
        </span>
        Personalized Itineraries at your fingertips.</h1>
        <p>Your personal trip planner and travel editor, creating cutom trips tailored to your intrest and budget.</p>
        <Link to={'/create-trip'}>
        <Button variant='outlined'>Get Started, Its Free..</Button>
        </Link>
    </div>
  )
}

export default Home
