import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../create-trip/firebaseconfig'
import InfoSection from './InfoSection'
import Hotels from './Hotels'
import DayPlan from './dayPlan'
import Hyperspeed from './Hyperspeed';
import Footer from './Footer'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import From from './from'

const Viewtrip = () => {
    const {tripId} = useParams()
    const [trip, setTrip] = useState([])
console.log(tripId)
useEffect(() => {
    tripId&& getTripData()
}, [tripId])

const getTripData = async () => {
    const tripd = doc(db, 'AiTrip', tripId)
    const getdocTrip = await getDoc(tripd)

    if(getdocTrip.exists()){
        console.log('doct', getdocTrip.data())
        setTrip(getdocTrip.data())
    }else{
        console.log('No data')
    }
}

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 bg-gradient-to-tl from-yellow-300 via-transparent to-stone-100'>
      <DotLottieReact
      src="https://lottie.host/2f7b8468-314a-4b2a-8b5e-c6a7a4caa127/BaemaY3unS.lottie"
      loop
      autoplay
    />
        
<div>

<From trip={trip}/>

<InfoSection trip={trip}/>

<Hotels trip={trip}/>

<DayPlan trip={trip}/>

<Footer/>
</div>

    </div>
  )
}

export default Viewtrip
