import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './components/HomePage/Header'
import Hero from './components/HomePage/Hero.jsx'
import CreateTrip from './components/Create-Trip/CreateTrip.jsx'
import Footer from './components/HomePage/Footer.jsx'
import Error from './components/Error'
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './components/View-Trip/ViewTrip'
import MyTrips from './components/My-Trips/MyTrips.jsx' 

const AppLayout = () => {
  return (
    <>
      <div className="font-gilroy font-medium text-lg">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    </>
  )
}

const appRoute = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Hero/>
      },
      {
        path: '/create-trip',
        element: <CreateTrip/>
      },
      {
        path: '/view-trip/:tripId',
        element: <ViewTrip/>
      },
      {
        path: '/my-trips',
        element: <MyTrips/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster />
      <RouterProvider router={appRoute}/>
    </GoogleOAuthProvider>
)
