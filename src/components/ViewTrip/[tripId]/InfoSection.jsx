import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "./GlobalAPI";
import axios from "axios";

const InfoSection = (tripInfo) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const placeApi = import.meta.env.VITE_GOOGLE_PLACE_API;
  useEffect(() => {
    tripInfo && GetPlacePhoto();
  }, [tripInfo]);

  const GetPlacePhoto = async () => {
    try {
      const res = await axios.get(
        "https://maps.googleapis.com/maps/api/place/textsearch/json",
        {
          params: {
            query: "Taj Mahal",
            key: placeApi,
          },
        }
      );
      console.log("API Results:", res.data.results);

      const results = res.data.results;
      if (results.length > 0) {
        const photoRef = results[0].photos?.[0]?.photo_reference;
        if (photoRef) {
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${placeApi}`;
          setPhotoUrl(photoUrl);
        } else {
          console.log("No photo reference found for this place.");
        }
      } else {
        console.log("No places found.");
      }
    } catch (error) {
      console.error("Failed to load place photo", error);
    }
  };

  return (
    <div>
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          <h2>photo</h2>
          <img src={photoUrl} alt="" />
          {tripInfo?.trip?.userSelctions?.location?.label}
        </h2>
        <div className="flex flex-row gap-3">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full">
            ⌛{tripInfo?.trip?.userSelctions?.noOfDays} Days
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full">
            💵{tripInfo?.trip?.userSelctions?.budget} Budget
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full">
            🧳{tripInfo?.trip?.userSelctions?.traveler} travellers
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
