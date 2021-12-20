

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
    to: String,//country name
    price: String,  // format : pricefirstclass,pricebusiness,priceeconomy
    Economy_seats: Number,
    BusinessClass_seats: Number,
    firstclass_seats: Number,
    baggage_allowance:Number,

    // maher 
  },
  { collection: "flights" }
);

export default flightSchema;
