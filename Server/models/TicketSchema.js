

import Mongoose from "mongoose";
let Schema = Mongoose.Schema;
let ticketSchema = new Schema(//to be filled when choosing seat number
  {
    IDUser: String,
    IDFlight: String,
    seat_number: String,//dy msh 3arf 3yznha wla l2 
    Cabin_Class: String, 
  },
  { collection: "tickets" }
);

export default ticketSchema;
