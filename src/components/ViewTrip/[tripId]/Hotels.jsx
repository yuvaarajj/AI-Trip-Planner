import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({trip}) {
    console.log() 

  return (
    <div>
<h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
  {trip?.tripDetails?.travelPlan?.hotelOptions?.map((hotel, index) => (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel?.name + ',' + hotel?.address} target='_blank'>
    <div className='hover:scale-110 transition-all cursor-pointer'>

    <DotLottieReact
      src="https://lottie.host/f8b2f6ad-8860-4195-a79b-63c58d06f3f4/YNUdw3gCQV.lottie"
      loop
      autoplay
    />
    
    <div>
{/* <img src={hotel.imageURL}  alt="" /> */}
      <h2 className='font-medium'>{hotel.name}</h2>
      <h2 className='text-gray-600 text-sm'>📍{hotel.address}</h2>
      <h2 className='text-sm'>💰{hotel.price}</h2>
      <h2>⭐{hotel.rating}</h2>
    </div>
    </div>
    </Link>
    
  ))}
</div>
    </div>
  )
}

export default Hotels
