import React from 'react'
import IMG from '../../assets/storyline-text-pattern-error-page-not-found.png';
// import { Button } from '../ui/button';
// import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const PlaceInfoCard = ({place}) => {
    const {bestTimetoVisit, geoCoordinates, placeDetails, placeImageUrl, placeName, ticketPricing, timeToTravel} = place;

    return(
        <Link to={'https://www.google.com/maps/search/?api=1&query='+placeName} target='_blank'>
            <div className='bg-gradient-to-r from-purple-400 via-pink-300 to-red-300 p-[2px] rounded-lg mt-2 hover:scale-105 transition-all cursor-pointer'>
                <div className='border rounded-lg p-3 flex gap-5 h-full w-full bg-white '>
                    <img src={IMG} className="rounded-xl w-[130px] h-[130px]"/>
                    <div>
                        <h2 className='font-bold text-lg'>{place.placeName}</h2>
                        <p className='text-xs mt-1 text-gray-500'>{placeDetails}</p>
                        <h2 className='text-sm mt-1 font-medium'>{timeToTravel}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaceInfoCard;