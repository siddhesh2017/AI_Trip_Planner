import React from 'react'
import IMG from '../../assets/storyline-text-pattern-error-page-not-found.png';
// import { Button } from '../ui/button';
// import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '@/services/GooglePlaceAPI';
import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from  '../../constants/options';


const PlaceInfoCard = ({place}) => {
    const {bestTimetoVisit, geoCoordinates, placeDetails, placeImageUrl, placeName, ticketPricing, timeToTravel} = place;
    const [ photoUrl, setPhotoUrl ] = useState();

    useEffect(() => {
        place&&GetPlacePhoto();
    }, [place]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place?.placeName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const imgUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name );
            setPhotoUrl(imgUrl);
        })
    };


    return(
        <Link to={'https://www.google.com/maps/search/?api=1&query='+placeName} target='_blank'>
            <div className='bg-gradient-to-r from-purple-400 via-pink-300 to-red-300 p-[2px] rounded-lg mt-2 hover:scale-105 transition-all cursor-pointer'>
                <div className='border rounded-lg p-3 flex gap-5 h-full w-full bg-white '>
                    {photoUrl? <img src={photoUrl} className="rounded-xl w-[130px] h-[130px] object-cover"/> : <img src={IMG} className="rounded-xl w-[130px] h-[130px] object-cover"/>}
                    <div>
                        <h2 className='font-bold text-lg'>{placeName}</h2>
                        <p className='text-xs mt-1 text-gray-500'>{placeDetails}</p>
                        <h2 className='text-sm mt-1 font-medium'>{timeToTravel}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaceInfoCard;