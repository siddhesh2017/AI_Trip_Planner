import React from 'react'
import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <>
        <div className='w-full h-screen bg-gradient-to-br from-purple-200 via-orange-200 to-yellow-200 flex flex-col gap-10 justify-center items-center'>
            <h1 className='font-bold text-5xl'>Get Started</h1>
            <Button>Get Started</Button>
        </div>
    </>
  )
}

export default Hero