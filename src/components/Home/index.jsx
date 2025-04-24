import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 bg-gradient-to-tl from-yellow-300 via-transparent to-stone-100 p-6 md:p-10 min-h-screen">
      {/* Left Lottie - Mobile: center and big | Desktop: as-is */}
      <div className="flex justify-center items-center md:block w-full md:w-auto">
        <DotLottieReact
          src="https://lottie.host/1ee7a499-02d6-4efa-abdf-f2c65a2ca7f3/KT5A47H7Es.lottie"
          loop
          autoplay
          className="w-52  sm:w-64 md:w-80"
        />
      </div>

      {/* Center Text Block */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl px-4">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl leading-snug">
          <DotLottieReact
            src="https://lottie.host/5ef513d1-b516-4df0-8bf9-bb0476795526/qqlw3fr19w.lottie"
            loop
            autoplay
            className="w-20 sm:w-30 md:scale-500 mx-auto m-3 p-2"
          />
          <span className="text-amber-400 block">
            Discover your next Adventure with AI:
          </span>
          <span className="text-black">
            Personalized Itineraries at your fingertips.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-rose-500 font-semibold">
          Your personal trip planner and travel editor — creating custom trips
          tailored to your interests and budget.
        </p>

        <Link to="/create-trip">
          <Button
            variant="contained"
            className="hover:scale-105 transition-transform text-base md:text-lg px-6 py-2"
          >
            Get Started, It’s Free..
          </Button>
        </Link>
      </div>

      {/* Right Lottie - unchanged */}
      <DotLottieReact
        src="https://lottie.host/5d34acba-0f1b-4deb-873e-08632e0e53ae/il4xghLgd3.lottie"
        loop
        autoplay
        className="w-40 sm:w-56 md:w-64"
      />
    </div>
  );
}

export default Home;
