import React from 'react'
import SEND from '../../assets/icons8-send-24.png'
import { Button } from '../ui/button';

const InfoSection = ({trip}) => {
    const {id, tripData, userEmail, userInput} = trip;
    console.log(trip);
  return (
    <div className=''>

        {/* <div className='flex justify-center items-start bg-white rounded-lg mx-20 md:mx-40 my-5 sm:gap-5 lg:gap-20 py-10 md:px-20 lg:px-44 xl:px-40  '>
            <img src={GIF} className=' w-[200px] h-[200px] sm:h-[250px] sm:w-[250px] md:h-[350px] md:w-[350px]  rounded' />
            <div className="animate-pulse flex flex-col items-start  gap-4 mt-10 sm:w-11 md:w-80 lg:w-1/2">
                <div>
                    <div className="w-4/5 h-6 bg-slate-400 rounded-md"></div>
                    <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
                </div>
                <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                <div className="h-7 bg-slate-400 w-full rounded-md"></div>
                <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
            </div>
        </div> */}

        <div className=' h-[370px] animate-pulse bg-zinc-200 mx-10 mt-10 rounded-xl'>
        </div>

        <div className=' flex justify-between items-center'>
            <div className='bg-transparent my-10 flex flex-col gap-2'>
                <h2 className='font-bold text-4xl'>{userInput?.location.label}</h2>
                <div className='flex justify-start items-center gap-3'>
                    <h3 className='p-1 px-3 bg-slate-50 rounded-full text-xs md:text-md'>🗓️ {userInput?.noOfDays} Days</h3>
                    <h3 className='p-1 px-3 bg-slate-50 rounded-full text-xs md:text-md'>💵 {userInput?.budget} Budget</h3>
                    <h3 className='p-1 px-3 bg-slate-50 rounded-full text-xs md:text-md'>🥂 No of Travelers: {userInput?.noOfPeople}</h3>
                </div>
            </div>

            <Button>
                <img width="21" height="21" src={SEND}/>
            </Button>

        </div>

    </div>
  )
}

export default InfoSection