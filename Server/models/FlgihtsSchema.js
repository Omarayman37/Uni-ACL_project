

import Mongoose from "mongoose";
let Schema = Mongoose.Schema;
let flightSchema = new Schema(
  {
    id: String,
    name: String,
    seat_number: String,
    range: String,
  },
  { collection: "flgits-data" }
);

export default flightSchema;
