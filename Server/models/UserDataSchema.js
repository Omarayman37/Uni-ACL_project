import Mongoose  from "mongoose";
let Schema = Mongoose.Schema
var userDataSchema = new Schema(
  {
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Nickname: String,
  },
  { collection: "user-data" }
);

export default userDataSchema;