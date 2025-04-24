export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A Sole Travels in Exploration",
    icon: "☝️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two people",
    icon: "✌️",
    people: "2",
  },
  {
    id: 3,
    title: "A Family",
    desc: "Three people +",
    icon: "👌",
    people: "3 to 5",
  },
  {
    id: 3,
    title: "A Family or friends",
    desc: "five +",
    icon: "👌",
    people: "5 to 10",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "cheap",
    desc: "Stay conscious of cost",
    icon: "👌",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Stay conscious of cost",
    icon: "👌",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Stay conscious of cost",
    icon: "👌",
  },
];

export const Ai_Prompt = `Generate a travel plan for location: {from} to {location} also give train route details, bus route details and flight details under one field transport details only {from} to {location} for {totalDays} days for {traveller} people with a {budget} budget. give me a hotel options with hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, place details, place image URL, geo coordinates, ticket pricing, time taken in each of locations for {totalDays} days with each day plan with best time to visit in JSON format`;
