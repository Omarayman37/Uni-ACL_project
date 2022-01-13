import Mongoose  from "mongoose";
let Schema = Mongoose.Schema
var userDataSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: false },
    nickname: String,
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    home_address: { type: String, required: false },
    contry_code: { type: String, required: false },
    telephone_number: { type: String, required: false },
    passport: { type: String, required: false },
    flightsID: { type: String, required: false },// dy tb2a el flights el 7tha fl favourite
    ticketsID: { type: String, required: false },
  },
  { collection: "user-data" }
);

export default userDataSchema;