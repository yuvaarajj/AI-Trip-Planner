import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './components/create-trip/index.jsx'
import Header from './components/Header/index.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './components/ViewTrip/[tripId]/index.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path:'/create-trip',
    element: <CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element: <Viewtrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_AUTH_ID}>
    <Header/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
