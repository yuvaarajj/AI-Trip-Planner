import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../create-trip/firebaseconfig'
import InfoSection from './InfoSection'
import Hotels from './Hotels'
import DayPlan from './dayPlan'
import Hyperspeed from './Hyperspeed';
import Footer from './Footer'

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
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>

{/* Information Section */}

<InfoSection trip={trip}/>

{/* Recommended Hotels */}
<Hotels trip={trip}/>

{/* Daily Plans */}
<DayPlan trip={trip}/>

{/* Footer */}
<Footer/>

<Hyperspeed
  effectOptions={{
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xFFFFFF,
      brokenLines: 0xFFFFFF,
      leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
      rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
      sticks: 0x03B3C3,
    }
  }}
/>

    </div>
  )
}

export default Viewtrip
