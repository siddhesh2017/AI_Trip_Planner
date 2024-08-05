import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero.jsx'
import CreateTrip from './components/CreateTrip.jsx'
import Footer from './components/Footer.jsx'
import Error from './components/Error'

const AppLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
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
        path: 'create-trip',
        element: <CreateTrip/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRoute}/>
  </React.StrictMode>,
)
