import React from 'react';
import IMG from '../../assets/storyline-text-pattern-error-page-not-found.png';
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '../../services/GooglePlaceAPI';
import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '@/constants/options';

const HotelCards = ({items}) => {
    const [ photoUrl, setPhotoUrl ] = useState();
    
    useEffect(() => {
        items&&GetPlacePhoto();
    }, [items]);


    const GetPlacePhoto = async () => {
        const data = {
            textQuery: items?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const imgUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name );
            setPhotoUrl(imgUrl);
        })
    };

    return(
        <>
            <Link to={'https://www.google.com/maps/search/?api=1&query='+items.hotelName+""+items.hotelAddress} target='_blank'>
                <div className='bg-gradient-to-r from-purple-400 via-pink-300 to-red-300 p-[2px] rounded-xl mt-2 hover:scale-105 transition-all cursor-pointer h-[340px] mb-20'>
                    <div className='bg-white h-full w-full rounded-xl py-3 px-3 '>
                        {photoUrl ? <img src={photoUrl} className="rounded-xl w-72 h-40"/> : <img src={IMG} className="rounded-xl w-72 h-40"/>}
                        <div className=' flex flex-col gap-2'>
                            <h2 className='font-medium leading-5 mt-3'>{items?.hotelName}</h2>
                            <h2 className='text-xs text-gray-500'>📍{items?.hotelAddress}</h2>
                            <h2 className='text-sm'>💰{items?.price}</h2>
                            <h2 className='text-sm'>🌟{items?.rating}</h2>
                        </div>
                    </div>  
                </div>
            </Link>
        </>
    )
}

export default HotelCards;