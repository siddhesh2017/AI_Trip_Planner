import { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import { SelectTravelerList, SelectBudgetOptions } from '../../constants/options';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AI_PROMPT } from '../../constants/options';
import { chatSession } from '@/Gemini_AI_service/AIModel';

const CreateTrip = () => {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);

    const handleFormData = (name, value) =>{
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const onGenerateTrip = async () =>{
        console.log("Trip generated");
        if(!formData?.location || !formData.noOfDays || !formData.budget || !formData.noOfPeople){
            toast.error("Please fill all the fields!!");
        }
        const Final_Prompt = AI_PROMPT
        .replace('{location}    ', formData?.location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.noOfPeople)
        .replace('{budget}', formData?.budget)
        .replace('{totalDays}', formData?.noOfDays);
        console.log(Final_Prompt);

        const result = await chatSession.sendMessage(Final_Prompt);
        console.log(result?.response?.text());
    }
    const clearFormData = () => {
        setFormData([]);
        console.log("Cleared data " + formData);
    }

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <>
            <div className="bg-slate-200 w-full h-auto py-10  px-40">
                <h2 className="text-3xl">Tell us your travel preferences</h2>
                <p className="font-normal font-neutral-400 mt-1">Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.</p>

                <div className="mt-10 flex flex-col gap-8">

                    {/* GoogleAutoComplete Input Box */}
                    <div>
                        <h2 className="text-xl mb-2">What is your destination of choice?</h2>
                        {/* react-google-places-autocomplete */}
                        <GooglePlacesAutocomplete 
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                place,
                                onChange:(v)=>{setPlace(v); handleFormData('location', v); }
                            }}
                        />
                    </div>

                    {/* noOfDays input box */}
                    <div>
                        <h2 className='text-xl mb-2'>How many days are you planning your trip?</h2>
                        <Input type="number"  onChange={(e) => {
                            (e.target.value > 10 || e.target.value < 1)? toast("We plan trip for maximum 10 days only!!") : handleFormData('noOfDays', e.target.value);
                        }} />
                    </div>

                    {/* Budget input box */}
                    <div className='mt-5'>
                        <h2 className='text-xl mb-3'>What is your budget?</h2>
                        <div className='grid grid-cols-3 gap-6 '>
                            {SelectBudgetOptions.map((item, index) => (
                                <div onClick={() => {
                                    handleFormData('budget', item.title);
                                }} key={index+(Math.random()*10)} className={`p-4 cursor-pointer border rounded-lg bg-slate-50 hover:shadow-lg ${(item.title == formData.budget) && "border-slate-950"}`} >
                                    <h2 className='text-3xl'>{item.icon}</h2>
                                    <h2 className='mt-1 font-bold text-lg'>{item.title}</h2>
                                    <h2 className='font-normal text-sm'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* NoOfPeople input box */}
                    <div className='mt-5'>
                        <h2 className='text-xl mb-3'>Who do you plan on travelling with on your next adventure?</h2>
                        <div className='grid grid-cols-3 gap-6 '>
                            {SelectTravelerList.map((item, index) => (
                                <div onClick={() => {
                                    handleFormData('noOfPeople', item.title);
                                }}
                                 key={index+(Math.random()*10)} className={`p-4 cursor-pointer border rounded-lg bg-slate-50 hover:shadow-lg ${(item.title == formData.noOfPeople) && "border-slate-950"} `} >
                                    <h2 className='text-3xl'>{item.icon}</h2>
                                    <h2 className='mt-1 font-bold text-lg'>{item.title}</h2>
                                    <h2 className='font-normal text-sm'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                            {/* <Button className="mt-10" >Generate Trip</Button> */}
                            <div className='my-10 w-full flex justify-end items-center gap-10'>
                                <button
                                    onClick={clearFormData}
                                    class="group relative flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-lg  bg-red-500 hover:bg-red-600 focus:shadow-md focus:shadow-black"
                                    >
                                    <svg
                                        viewBox="0 0 1.625 1.625"
                                        class="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                                        height="15"
                                        width="15"
                                    >
                                        <path
                                        d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"
                                        ></path>
                                        <path
                                        d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"
                                        ></path>
                                        <path
                                        d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"
                                        ></path>
                                    </svg>
                                    <svg
                                        width="14"
                                        fill="none"
                                        viewBox="0 0 39 7"
                                        class="origin-right duration-500 group-hover:rotate-90"
                                    >
                                        <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                                        <line
                                        stroke-width="3"
                                        stroke="white"
                                        y2="1.5"
                                        x2="26.0357"
                                        y1="1.5"
                                        x1="12"
                                        ></line>
                                    </svg>
                                    <svg width="13" fill="none" viewBox="0 0 33 39" class="">
                                        <mask fill="white" id="path-1-inside-1_8_19">
                                        <path
                                            d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                        ></path>
                                        </mask>
                                        <path
                                        mask="url(#path-1-inside-1_8_19)"
                                        fill="white"
                                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                        ></path>
                                        <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                                        <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                                    </svg>
                                </button>

                                <button 
                                    onClick={onGenerateTrip}
                                    className="cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s]  active:bg-violet-700 focus:ring-violet-700"
                                    >
                                    Generate Trip
                                </button>
                            </div>

            </div>
        </>
    )
}

export default CreateTrip;