import Mongoose  from "mongoose";
let Schema = Mongoose.Schema
var userDataSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: false },
    username: { type: String, required: false },
    nickname: String,
    username:String,
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    home_address: { type: String, required: false },
    contry_code: { type: String, required: false },
    telephone_number: { type: String, required: false },
    passport: { type: String, required: false },
    flightsID: [Mongoose.Schema.Types.ObjectId], // dy tb2a el flights el 7tha fl favourite
    ticketsID: [Mongoose.Schema.Types.ObjectId],
  },
  { collection: "user-data" }
);

export default userDataSchema;