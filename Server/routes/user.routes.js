import userDataSchema from '../models/UserDataSchema.js'
import crypto, { createCipheriv, createHash, randomBytes } from "crypto";
import mongoose from "mongoose";
// Data Models
var UserData = mongoose.model("UserData", userDataSchema);
// let flightData = mongoose.model("flightData", flightSchema);
// let ticketData = mongoose.model("ticketData", ticketSchema);

export async function register_user(req, res) {
  console.log(
    "in the post method server resived post request with body:\n" +
      JSON.stringify(req.body)
  );
  console.log(req.body.user_email);
  console.log(req.body.user_password);
  // here
  let hashed_user_pass = createHash("sha256") // hash the passowrd to send it via internet
    .update(req.body.user_password)
    .digest("hex");

  let querry = {
    email: req.body.user_email,
    password: req.body.user_password,
  };
  //console.log(querry)
  const user = await UserData.findOne(querry);
  console.log(`the loged in user is ${user}`);

  res.status(200).send({success:true,token:'tok'})
  console.log('we send 200 wala')
}

