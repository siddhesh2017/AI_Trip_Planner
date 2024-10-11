import React from 'react'
import SEND from '../../assets/icons8-send-24.png'
import { Button } from '../ui/button';
import { GetPlaceDetails } from '@/services/GooglePlaceAPI';
import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from  '../../constants/options';

const InfoSection = ({trip}) => {
    const {id, tripData, userEmail, userInput} = trip;
    const [ photoUrl, setPhotoUrl ] = useState();

    useEffect(() => {
        userInput&&GetPlacePhoto();
    }, [userInput]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: userInput?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const imgUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name );
            setPhotoUrl(imgUrl);
        })
    };
    
  return (
    <div className='flex items-start justify-center gap-10'>
        <div className='flex justify-center items-center'>
            {photoUrl ? <img className='h-[370px] w-[90%]  object-cover  mx-5 mt-10 rounded-xl' src={photoUrl} /> : <div className=' h-[370px] animate-pulse bg-zinc-200 mx-10 mt-10 rounded-xl'> </div>}
        </div>

        <div className=' flex justify-between items-center'>
            <div className='bg-transparent my-10 flex flex-col gap-2'>
                <h2 className='font-bold text-5xl mb-5 overflow-hidden'>{userInput?.location.label}</h2>
                <div className='flex justify-start items-center gap-3'>
                    <h3 className='p-2 px-3 bg-slate-50 rounded-full text-xs md:text-md'>🗓️ {userInput?.noOfDays} Days</h3>
                    <h3 className='p-2 px-3 bg-slate-50 rounded-full text-xs md:text-md'>💵 {userInput?.budget} Budget</h3>
                    <h3 className='p-2 px-3 bg-slate-50 rounded-full text-xs md:text-md'>🥂 No of Travelers: {userInput?.noOfPeople}</h3>
                </div>
                <Button className="w-12 h-12 rounded-lg mt-5">
                    <img src={SEND}/>
                </Button>
            </div>

            

        </div>

    </div>
  )
}

export default InfoSection;