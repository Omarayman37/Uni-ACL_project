

import Mongoose from "mongoose";
let Schema = Mongoose.Schema;
let flightSchema = new Schema(
  {
    id: String,
    name: String,
    seat_number: String,
    range: String,
    arrival_time: Date,
    departure_time: Date,
    from: String,
    to: String,
    price: String,
  },
  { collection: "flights" }
);

export default flightSchema;
