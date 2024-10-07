import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  SelectTravelerList,
  SelectBudgetOptions,
} from "../../constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const handleFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = () => {
    console.log("Trip generated");
  };

  return (
    <>
      <div className="bg-slate-200 w-full h-auto py-10  px-40">
        <h2 className="text-3xl">Tell us your travel preferences</h2>
        <p className="font-normal font-neutral-400 mt-1">
          Just provide some basic information and our trip planner will generate
          a customized itinerary based on your preferences.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {/* GoogleAutoComplete Input Box */}
          <div>
            <h2 className="text-xl mb-2">
              What is your destination of choice?
            </h2>
            {/* react-google-places-autocomplete */}
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleFormData("location", v);
                },
              }}
            />
          </div>

          {/* noOfDays input box */}
          <div>
            <h2 className="text-xl mb-2">
              How many days are you planning your trip?
            </h2>
            <Input
              type="number"
              onChange={(e) => {
                e.target.value > 10 || e.target.value < 1
                  ? toast("We plan trip for maximum 10 days only!!")
                  : handleFormData("noOfDays", e.target.value);
              }}
            />
          </div>

          {/* Budget input box */}
          <div className="mt-5">
            <h2 className="text-xl mb-3">What is your budget?</h2>
            <div className="grid grid-cols-3 gap-6 ">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  onClick={() => {
                    handleFormData("budget", item.title);
                  }}
                  key={index + Math.random() * 10}
                  className={`p-4 cursor-pointer border rounded-lg bg-slate-50 hover:shadow-lg ${item.title == formData.budget && "border-slate-950"}`}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="mt-1 font-bold text-lg">{item.title}</h2>
                  <h2 className="font-normal text-sm">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* NoOfPeople input box */}
          <div className="mt-5">
            <h2 className="text-xl mb-3">
              Who do you plan on travelling with on your next adventure?
            </h2>
            <div className="grid grid-cols-3 gap-6 ">
              {SelectTravelerList.map((item, index) => (
                <div
                  onClick={() => {
                    handleFormData("noOfPeople", item.title);
                  }}
                  key={index + Math.random() * 10}
                  className={`p-4 cursor-pointer border rounded-lg bg-slate-50 hover:shadow-lg ${item.title == formData.noOfPeople && "border-slate-950"} `}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="mt-1 font-bold text-lg">{item.title}</h2>
                  <h2 className="font-normal text-sm">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <Button className="mt-10" >Generate Trip</Button> */}
        <div onClick={onGenerateTrip} className="my-10 w-full flex justify-end">
          <button className="cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s]  active:bg-violet-700 focus:ring-violet-700">
            Generate Trip
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTrip;
