import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Home() {
  return (
    <div className="flex flex-row justify-center items-center bg-gradient-to-tl p-10 from-yellow-300 via-transparent to-stone-100">
      

      <DotLottieReact
        src="https://lottie.host/1ee7a499-02d6-4efa-abdf-f2c65a2ca7f3/KT5A47H7Es.lottie"
        loop
        autoplay
        />
      

      <div className="flex flex-col items-center mx-10 gap-2 ">
        <h1 className="font-bold text-7xl text-center p-2">
          <DotLottieReact
            className="p-2"
            src="https://lottie.host/5ef513d1-b516-4df0-8bf9-bb0476795526/qqlw3fr19w.lottie"
            loop
            autoplay
          />
          <span className="text-amber-300 text-8xl">
            Discover your next Adventure with AI:
          </span>
          Personalized Itineraries at your fingertips.
        </h1>
        <p>
          Your personal trip planner and travel editor, creating cutom trips
          tailored to your intrest and budget.
        </p>
        <Link to={"/create-trip"}>
          <Button variant="contained" className="hover:scale-110 transition-all ">Get Started, Its Free..</Button>
        </Link>
      </div>
        <DotLottieReact 
          src="https://lottie.host/5d34acba-0f1b-4deb-873e-08632e0e53ae/il4xghLgd3.lottie"
          loop
          autoplay
        />
      
    </div>
  );
}

export default Home;
