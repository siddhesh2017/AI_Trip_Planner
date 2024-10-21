import React from 'react';
import { Button } from '../ui/button';
import USER from '../../assets/willoy-purple-user-icon.png';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigation } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from "sonner";
import { Link } from 'react-router-dom';


const Header = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigateTo = useNavigation();

    const login = useGoogleLogin({
        onSuccess:(codeResp) => GetUserProfile(codeResp),
        onError:(error) => console.log(error)
    })

    const GetUserProfile = (tokenInfo) => {
        try{
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
                headers:{
                    Authorization:`Bearer ${tokenInfo.access_token}`,
                    Accept:'Application/json'
                }
            }).then((resp) => {
                toast("Logged in successfully!!");
                localStorage.setItem('user', JSON.stringify(resp?.data));
                setOpenDialog(false);
                window.location.reload();
            })
        } catch(e){
            console.error();
            (e);
        }
    }
   
    return (
        <>
            <div className="w-full fixed h-auto bg-transparent  bg-opacity-30 border-b border-black/20 z-10 overflow-hidden  backdrop-blur-sm flex justify-between items-center px-10 py-2">
                <Link to='/'>
                    <div className="flex items-center p-3 gap-2">
                        <img width="50" height="50" src="https://img.icons8.com/nolan/50/canvas-student.png" alt="anghami"/>
                        <h1 className="text-2xl font-extrabold text-zinc-900">AIwaysOnTrip</h1>
                    </div>
                </Link>
                <div>
                    {
                        user? 
                        <div className='flex gap-5 justify-center items-center'>
                            <a href="/my-trips">
                                <Button variant="outline" className='rounded-full' >My Trips</Button>
                            </a>
                            <Popover>
                                <PopoverTrigger>
                                    <img className='bg-black rounded-full object-cover border-2 border-orange-500 hover:border-orange-700' width="47" height="47" src={USER} alt="user"/>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <h2 onClick={() => {
                                        googleLogout();
                                        localStorage.clear();
                                        window.location.href = 'http://localhost:5173/';
                                    }}>LogOut</h2>
                                </PopoverContent>
                            </Popover>


                        </div> 
                        :    
                        <Button onClick={() => {
                            setOpenDialog(true);
                        }}>Sign in</Button>
                    }
                </div>
                <Dialog open={openDialog}>
                                <DialogContent>
                                    <DialogHeader>
                                    <DialogTitle>
                                        <div className='flex items-center gap-2'>
                                            <img width="50" height="50" src="https://img.icons8.com/color/50/anghami.png" alt="anghami"/>
                                            <h1 className='font-bold text-3xl'>WanderAI</h1>
                                        </div>
                                    </DialogTitle>
                                    <DialogDescription>
                                        <h2 className='font-bold text-xl mt-3 flex items-center gap-1'>Sign in with Google</h2>
                                        <p>Sign in to the App with Google Authentication securely</p>

                                        <Button  className='w-full mt-5 flex items-center gap-2' onClick={login}>
                                            {loading ? 
                                            
                                                <>
                                                    <div class='flex space-x-2 justify-center items-center bg-transperant h-auto dark:invert'>
                                                        <span class='sr-only'>Loading...</span>
                                                        <div class='h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                                        <div class='h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                                        <div class='h-3 w-3 bg-white rounded-full animate-bounce'></div>
                                                    </div>
                                                </>

                                            : 
                                                <>
                                                    <img width="25" height="25" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"/>
                                                    Sign in with Google
                                                </>
                                            }
                                        </Button>
                                    </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default Header;