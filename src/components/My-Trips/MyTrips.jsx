import React from 'react';
import { useNavigation } from 'react-router-dom';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/services/FireBaseConfig';
import MyTripCards from './MyTripCards';

const MyTrips = () => {

    const [userTrips, setUserTrips] = useState([]);
    const navigateTo = useNavigation();
    
    const getUserTrip = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if(!user){
            navigateTo('/');
            toast("Please Login");
        }
        setUserTrips([]);
        const q = query(collection(db, "AItrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal => [...prevVal, doc.data()]);
        });
    }
    
    useEffect(() => {
        getUserTrip();
        
    }, []);
    

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 pt-28'>
            <h2 className='font-bold text-4xl'>My-trips</h2>
            
            <div className='grid  grid-cols-2 lg:grid-cols-3 gap-5 mt-7'>
                {userTrips.map((trips, index) => (
                    <MyTripCards key={index+Math.random()*100} trips={trips}  />
                ))}
            </div>
        </div>
    )
}

export default MyTrips;