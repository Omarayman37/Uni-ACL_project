

import Mongoose from "mongoose";
let Schema = Mongoose.Schema;
let flightSchema = new Schema(
  {
    id: String,
    name: String,
    seat_number: String,
    range: String,
    duration: Number,
    arrival_time: Date,
    departure_time: Date,
    from: String, // contry name
    to: String, //country name
    price: String,
    Economy_seats: Number,
    BusinessClass_seats: Number,
    FirstClass_seats:Number,
    baggage_allowance: Number,
    Seats: {
      EconomySeats: {
        type: Map,
        of: String,
      },

      BusinessSeats: {
        type: Map,
        of: String,
      },

      FirstClassSeats: {
        type: Map,
        of: String,
      }
    },
  },
  { collection: "flights" }
);

export default flightSchema;
