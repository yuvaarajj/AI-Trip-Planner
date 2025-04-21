import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

const From = ({ trip }) => {
  console.log("new");
  console.log(trip?.userSelctions);
  console.log("old");
  const fromVal = trip?.tripDetails?.travelPlan?.transportOptions;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold font-serif text-2xl ">{trip?.userSelctions?.from?.label}</p>
        <DotLottieReact
          src="https://lottie.host/9970a8a8-56f6-4d11-9e16-3c96571bfa20/NS6MLRU5OW.lottie"
          loop
          autoplay
        />

        <p className="font-bold font-serif text-2xl ">{trip?.userSelctions?.location?.label}</p>
      </div>
      <div className="flex flex-row justify-center items-center m-5">
        <div className="scale-400 p-10">🚌</div>

        <div>
          <h2 className="font-bold text-2xl">Details: </h2>
          <p className="text-xl">{fromVal?.bus?.details}</p>
          <h2 className="font-bold text-2xl">Frequency: </h2>
          <p className="text-xl">{fromVal?.bus?.frequency}</p>
          <h2 className="font-bold text-2xl">Price: </h2>
          <p className="text-xl">{fromVal?.bus?.price_range}</p>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center m-5">
        <div className="scale-400 p-10">✈️</div>
        <div>
          <h2 className="font-bold text-2xl">Details: </h2>
          <p className="text-xl">{fromVal?.flight?.details}</p>
          <h2 className="font-bold text-2xl">Frequency: </h2>
          <p className="text-xl">{fromVal?.flight?.frequency}</p>
          <h2 className="font-bold text-2xl">Price: </h2>
          <p className="text-xl">{fromVal?.flight?.price_range}</p>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center m-5">
        <div className="scale-400 p-10">🚕</div>
        <div>
          <h2 className="font-bold text-2xl">Details: </h2>
          <p className="text-xl">{fromVal?.taxi_car?.details}</p>
          <h2 className="font-bold text-2xl">Frequency: </h2>
          <p className="text-xl">{fromVal?.taxi_car?.frequency}</p>
          <h2 className="font-bold text-2xl">Price: </h2>
          <p className="text-xl">{fromVal?.taxi_car?.price_range}</p>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center m-5">
        <div className="scale-400 p-10">🚆</div>
        <div>
          <h2 className="font-bold text-2xl">Details: </h2>
          <p className="text-xl">{fromVal?.train?.details}</p>
          <h2 className="font-bold text-2xl">Frequency: </h2>
          <p className="text-xl">{fromVal?.train?.frequency}</p>
          <h2 className="font-bold text-2xl">Price: </h2>
          <p className="text-xl">{fromVal?.train?.price_range}</p>
        </div>
      </div>
    </div>
  );
};

export default From;
