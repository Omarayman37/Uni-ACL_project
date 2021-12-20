

import Mongoose from "mongoose";
let Schema = Mongoose.Schema;
let ticketSchema = new Schema(//to be filled when choosing seat number
  {
    IDUser: String,
    IDFlight: String,
    flightNr: String,
    seat_number: String,//dy msh 3arf 3yznha wla l2 
    Cabin_Class: String, 
    from: String, // contry name 
    to: String,//country name
    arrival_time: Date,
    departure_time: Date,
    price : Number,
  },
  { collection: "tickets" }
);

export default ticketSchema;
