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
        <div>
            <Link to={"/view-trip/"+trips.id}>
                {photoUrl ? <img className='rounded-xl mt-5 w-72 h-40' src={photoUrl} /> : <div className=' rounded-xl mt-5 w-72 h-40'> </div>}

                <div>
                    <h2 className='font-bold text-lg'>{trips?.userInput?.location?.label}</h2>
                    <h2 className='font-medium text-sm text-gray-500'>{`${userInput?.noOfDays} Days trip with ${userInput?.budget} Budget`}</h2>
                </div>
            </Link>
            <div>
                <Button onClick={() => {
                    deleteTrip(id)
                    
                }} >Delete</Button>
            </div>
        </div>
    ) 
}

export default MyTripCards;