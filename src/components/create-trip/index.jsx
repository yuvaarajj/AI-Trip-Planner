import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Ai_Prompt, SelectBudgetOptions, SelectTravelesList } from "./options";
import { chatSession } from "./aimodal";
import * as React from "react";
import { FaGoogle } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "./firebaseconfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setplace] = useState("");
  const [formData, setformData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const navigation = useNavigate();
  const handleInputChange = (name, value) => {
    setformData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeRes) => getUserProfile(codeRes),
    onError: (err) => console.log(err),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_tokens=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        generateTrip();
      });
  };

  const savePlan = async (tripdata) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrip", docId), {
      userSelctions: formData,
      tripDetails: JSON.parse(tripdata),
      userEmail: user?.email,
      id: docId,
    });
    setloading(false);
    navigation("/view-trip/" + docId);
  };

  const generateTrip = async () => {
    setloading(true);
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      return console.log("enter all details");
    }
    const final_Prompt = Ai_Prompt.replace(
      "{location}",
      formData?.location.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{from}", formData?.from)
      .replace("{from}", formData?.from);

    const result = await chatSession.sendMessage(final_Prompt);
    setloading(false);
    savePlan(result?.response?.text());
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-4 py-10 bg-gradient-to-tl from-stone-100 via-transparent to-yellow-300">
      <h2 className="font-bold text-xl sm:text-2xl">
        Tell us your Travel Preference
      </h2>
      <p className="text-base sm:text-xl text-gray-500">
        Just provide some basic information and our trip planner will generate a
        customized trip based on your preference.
      </p>

      <div className="p-5 sm:p-10 m-3">
        <h2 className="text-lg sm:text-xl font-medium mb-2">
          What is Destination of your choice?
        </h2>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyBQKg8ya9jEqpKgfr3iFA4aokBT8Kh5y-A"
          selectProps={{
            place,
            onChange: (v) => {
              setplace(v);
              handleInputChange("location", v);
            },
          }}
        />
      </div>

      <div className="m-3">
        <h2 className="font-bold text-xl sm:text-2xl mb-2">
          How many days are you planning?
        </h2>
        <TextField
          className="w-full sm:w-64"
          id="outlined-basic"
          variant="outlined"
          type="number"
          placeholder="Ex. 2"
          onChange={(e) => handleInputChange("noOfDays", e.target.value)}
        />
      </div>

      <div>
        <h2 className="font-bold text-xl sm:text-2xl mt-6 mb-3">
          What is your Budget?
        </h2>
        <div className="flex flex-col sm:flex-row justify-around gap-4 m-3">
          {SelectBudgetOptions.map((each, ind) => (
            <div
              key={ind}
              className={`text-center w-full sm:w-1/3 hover:shadow-2xl cursor-pointer p-4 border-r-2 hover:scale-105 transition-all border-gray-500 ${
                formData?.budget === each.title &&
                "shadow-lg bg-gradient-to-tl from-yellow-300 via-transparent to-stone-100"
              }`}
              onClick={() => handleInputChange("budget", each.title)}
            >
              <h2>{each.icon}</h2>
              <h2 className="font-bold">{each.title}</h2>
              <h2>{each.desc}</h2>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-xl sm:text-2xl mt-6 mb-3">
          How do you plan to travel?
        </h2>
        <div className="flex flex-col sm:flex-row justify-around gap-4 m-3">
          {SelectTravelesList.map((each, ind) => (
            <div
              key={ind}
              className={`text-center w-full sm:w-1/3 hover:shadow-2xl cursor-pointer p-4 border-r-2 hover:scale-105 transition-all border-gray-500 ${
                formData?.traveler === each.people &&
                "shadow-lg bg-gradient-to-tl from-yellow-300 via-transparent to-stone-100"
              }`}
              onClick={() => handleInputChange("traveler", each.people)}
            >
              <h2>{each.icon}</h2>
              <h2 className="font-bold">{each.title}</h2>
              <h2>{each.desc}</h2>
            </div>
          ))}
        </div>

        <Button onClick={generateTrip} className="w-full sm:w-auto mt-5">
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-yellow-400 hover:via-red-500 hover:to-pink-500 transition-all duration-700 ease-in-out cursor-pointer text-center">
              AI Trip Planner (DEMO)
            </h1>
            <h2 className="font-bold text-center mt-4">Sign in with Google</h2>
            <p className="text-gray-500 text-center mb-4">
              Sign in with google authentication securely
            </p>

            <Button
              variant="outlined"
              onClick={login}
              className="w-full flex items-center justify-center gap-2"
            >
              <FaGoogle />
              Sign In With Google
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
