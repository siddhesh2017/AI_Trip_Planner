import React from 'react'
import PlaceInfoCard from './PlaceInfoCard';

const PlacesToVisit = ({trip}) => {
    const {id, tripData, userEmail, userInput} = trip;
    console.log(tripData?.itinerary[1].plan[0]);
  return (
    <div>
        <h2 className='font-extrabold text-2xl'>Places to Visit</h2>

        <div>
            {tripData?.itinerary?.map((items, index) => (
                <div key={index+(Math.random()*2)} className='mt-5'>
                        <h2 className='font-medium text-lg'>Day {items?.day}</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {items?.plan?.map((place, index) => (
                                <div key={index+(Math.random()*3)} className='my-1' >
                                    <h2 className='font-medium text-sm text-orange-600'>{place?.bestTimetoVisit}</h2>
                                    <PlaceInfoCard place={place}/>
                                </div>
                            ))}
                        </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit