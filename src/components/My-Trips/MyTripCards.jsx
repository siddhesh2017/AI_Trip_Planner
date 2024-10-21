import React from 'react';
import IMG from '../../assets/storyline-text-pattern-error-page-not-found.png';
import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '@/constants/options';
import { GetPlaceDetails } from '@/services/GooglePlaceAPI';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '@/services/FireBaseConfig';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const MyTripCards = ({trips}) => {
    const {id, tripData, userEmail, userInput} = trips;
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

    const deleteTrip = async (id) => {
        const tripRef = doc(db, 'AItrips', id );

        await deleteDoc(tripRef);
        window.location.reload();
    }

    return (
        <div className='  bg-gradient-to-r from-purple-400 via-pink-300 to-red-300 p-[2px] rounded-lg mt-2 hover:scale-105 transition-all cursor-pointer'>
            <div className='bg-white h-full w-full rounded-lg py-3 px-3 '>
                <Link to={"/view-trip/"+trips.id}>
                    {photoUrl ? <img className='rounded-xl mt-1 w-72 h-40' src={photoUrl} /> : <div className=' rounded-xl mt-1 w-72 h-40'> </div>}

                    <div>  
                        <h2 className='font-bold text-lg mt-4 '>{trips?.userInput?.location?.label}</h2>
                        <h2 className='font-medium text-sm  text-gray-500'>{`${userInput?.noOfDays} Days trip with ${userInput?.budget} Budget`}</h2>
                    </div>
                </Link>
                <div className='mt-4 flex justify-end'>
                    <Button onClick={() => {
                        deleteTrip(id)
                        
                    }} >Delete</Button>
                </div>
            </div>
        </div>
    ) 
}

export default MyTripCards;