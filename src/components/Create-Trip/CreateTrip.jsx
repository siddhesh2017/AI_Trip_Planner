import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useState } from 'react';

const CreateTrip = () => {
    const [place, setPlace] = useState();
    return (
        <>
            <div className="bg-slate-200 w-full h-auto py-10  px-40">
                <h2 className="text-3xl">Tell us your travel preferences</h2>
                <p className="font-normal font-neutral-400 mt-1">Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.</p>

                <div className="mt-10">
                    <div>
                        <h2 className="text-xl">What is your destination of choice?</h2>
                        {/* react-google-places-autocomplete */}
                        <GooglePlacesAutocomplete 
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                place,
                                onChange:(v)=>{setPlace(v); console.log(v);}
                            }}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default CreateTrip;