import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
        <div className='w-full h-screen bg-gradient-to-br from-purple-200 via-orange-200 to-yellow-200 flex flex-col gap-10 justify-center items-center'>
            <h1 className='font-bold text-5xl'>Get Started</h1>
            <Link to='/create-trip' >
              <Button>Get Started</Button>
            </Link>
        </div>
    </>
  )
}

export default Hero