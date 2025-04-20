import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function DayPlan(trip) {
  console.log("lastCheck");
  console.log(trip);
  console.log("lastCheck");
  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>
      <div>
        {trip?.trip?.tripDetails?.travelPlan?.itinerary.map((item, index) => (
          <div>
            <h2 className="font-medium text-bold">Day {item.day}</h2>
            <h2 className="font-medium text-sm text-orange-500">
              Best Time To Visit {item.bestTimeToVisit}
            </h2>
            {item?.plan.map((place, index) => (
            <Link to={'https://www.google.com/maps/search/?api=1&query='+ place.placeName} target='_blank'>
              <div className="border rounded-2xl p-2 m-2 flex flex-row justify-center items-center gap-2 hover:scale-110 transition-all shadow-emerald-200 cursor-pointer">
                <div className="w-100">
                  <h2 className="font-bold text-2xl text-blue-400">
                    {place.placeName}
                  </h2>
                  <img
                    className="h-45 w-75"
                    src="/travel_cover_pic.jpg"
                    alt=""
                    />
                </div>
                <div className="w-135">
                  <p className="font-medium text-xl text-gray-600">
                    {place.details}
        
                  </p>
                  <h2>⌚{place.timeTaken}</h2>
                  <Button variant="contained">📌</Button>
                </div>
              </div>
            </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayPlan;
