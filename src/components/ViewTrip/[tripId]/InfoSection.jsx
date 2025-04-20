import React from 'react'

const InfoSection = (tripInfo) => {
  return (
    <div>
      
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{tripInfo?.trip?.userSelctions?.location?.label}</h2>
        <div className='flex flex-row gap-3'>

        <h2 className='p-1 px-3 bg-gray-200 rounded-full'>⌛{tripInfo?.trip?.userSelctions?.noOfDays} Days</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full'>💵{tripInfo?.trip?.userSelctions?.budget} Budget</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full'>🧳{tripInfo?.trip?.userSelctions?.traveler} travellers</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoSection
