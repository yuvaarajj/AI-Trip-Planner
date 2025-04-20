const BASE_URL ='https://maps.googleapis.com/maps/api/place/textsearch'

const config = {
    headers:{
'Content-Type':'application/json',
'X-Goo-Api-key': import.meta.env.VITE_GOOGLE_PLACE_API
    }
}