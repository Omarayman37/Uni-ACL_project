import Mongoose  from "mongoose";
let Schema = Mongoose.Schema
var userDataSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickname: String,
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    home_address: { type: String, required: true },
    contry_code: { type: String, required: true },
    telephone_number: { type: String, required: true },
    passport: { type: String, required: true },
  },
  { collection: "user-data" }
);

export default userDataSchema;