import React from 'react';
import HotelCards from './HotelCards';

const Hotels = ({trip}) => {
    const {id, tripData, userEmail, userInput} = trip;
    return(
        <>
            <div className=" rounded-t-lg px-5 pt-20">
                <h2 className="font-extrabold text-3xl ">Hotel Recommendation</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-7 ">
                    {tripData?.hotels?.map((items, index) => (
                        <HotelCards  items={items}/> 
                    ))}
                </div>
            </div>
        </>
    )
}

export default Hotels;