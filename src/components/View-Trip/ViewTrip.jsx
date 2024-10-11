import React from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/services/FireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import InfoSection from './InfoSection';
import Hotels from './Hotels';
import PlacesToVisit from './PlacesToVisit';

const ViewTrip = () => {
    const {tripId} = useParams();
    const [ trip, setTrip ] = useState({});

    useEffect(() => {
        getTripData();
    }, [tripId]);
    
    const getTripData = async () => {
        const docRef = doc(db, 'AItrips', tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log(docSnap.data().tripData.location);
            setTrip(docSnap.data());
        }
        else{
            toast("No data found");
        }
    }
    return(
        <div className=' box-border  pt-20 md:px-20 lg:px-40 w-full  bg-gradient-to-br from-purple-100 via-orange-100 to-yellow-100'>
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Hotels Section */}
            <Hotels trip={trip} />
            {/* Daily Plans */}
            <PlacesToVisit trip={trip} />
        </div>
    )
};

export default ViewTrip;