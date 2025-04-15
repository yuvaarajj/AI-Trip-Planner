import React from 'react'

function DayPlan(trip) {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places To Visit</h2>
      {trip?.tripDetails?.travelPlan?.itinerary?.map((place, index) => (
        <img src="/travel_cover_pic.jpg" alt="" />
      ))}
    </div>
  )
}

export default DayPlan
