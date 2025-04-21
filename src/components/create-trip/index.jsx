import { Button, ButtonBase, TextField } from "@mui/material";
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
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        generateTrip();
      });
  };

  const savePlan = async (tripdata) => {
    setloading(true);
    // Add a new document in collection "cities"
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

    // setOpenDialog(true);
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
    console.log(result?.response?.text());
    savePlan(result?.response?.text());
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 p-10 bg-gradient-to-tl from-stone-100 via-transparent to-yellow-300">
      <h2 className="font-bold text-2xl">Tell us your Travel Preference</h2>
      <p className="text-xl text-gray-500">
        Just provide some basic information and our trip planner will generate a
        customized trip based on your preference.
      </p>
      <div className="p-10 m-3">
        {/* <h2>From (current location)</h2>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyBQKg8ya9jEqpKgfr3iFA4aokBT8Kh5y-A"
          selectProps={{
            place,
            onChange: (e) => {
              setplace(e);
              handleInputChange("from", e);
            },
          }}
        /> */}

        <h2 className="text-xl font-medium">
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
        <h2 className="font-bold text-2xl">How many days are you planning?</h2>
        <TextField
          className="hover:scale-110 transition-all shadow-amber-700"
          id="outlined-basic"
          variant="outlined"
          type="number"
          placeholder="Ex. 2"
          onChange={(e) => handleInputChange("noOfDays", e.target.value)}
        />
      </div>
      <div>
        <h2 className="font-bold text-2xl">What is your Budget?</h2>
        <div className="flex flex-row justify-around m-3">
          {SelectBudgetOptions.map((each, ind) => (
            <div
              key={ind}
              className={`hover:shadow-2xl cursor-pointer p-4 border-r-2 hover:scale-110 transition-all border-gray-500 ${
                formData?.budget == each.title &&
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
        <div>
          <h2 className="font-bold text-2xl">How do you planning to travel?</h2>
          <div className="flex flex-row justify-around m-3">
            {SelectTravelesList.map((each, ind) => (
              <div
                key={ind}
                className={`hover:shadow-2xl hover:scale-110 border-r-2 p-4 cursor-pointer  ${
                  formData?.traveler == each.people &&
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
        </div>
        <Button onClick={generateTrip}>
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
          <h1 className='text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text 
bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
hover:from-yellow-400 hover:via-red-500 hover:to-pink-500 
transition-all duration-700 ease-in-out cursor-pointer'>AI Trip Planner (DEMO)</h1>
            <h2 className="font-bold">Sign in with Google</h2>
            <p className="text-gray-500">Sign in with google authentication securely</p>

            <Button
              variant="outlined"
              onClick={login}
              className="w-full m-5 gap-4"
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
