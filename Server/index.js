import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import crypto, { createDecipheriv } from "crypto";
//
import userDataSchema from "./models/UserDataSchema.js";
import flightSchema from './models/FlgihtsSchema.js';
import ticketSchema from './models/TicketSchema.js';
import {timeDiffCalc} from "./util/diffrenceHours.js";
import {create_functional_querry_from_request} from './util/querry_func.js'
import CreateSeatsObject from './util/CreateSeatsObject.js'
console.log("server is running");
var userID;//id of signed in user
const app = express();
const Schema = mongoose.Schema;

app.use(express.json({ limit: "30mb", extended: "true" })); //Used to parse JSON bodies
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
import nodemailer from "nodemailer";
//const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service : "hotmail" ,
  auth:{
    user:"AlmazaAirport@outlook.com",
    pass: "AhmedMaherT346-3200"
  }
});



// Connect to DB and Server
const CONNECTION_URL =
  "mongodb+srv://karim:karim@cluster0.gmzul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, UseUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port:${PORT}`))
  )
  .catch((error) => console.log(error.message));

// Data Models
var UserData = mongoose.model("UserData", userDataSchema);
let flightData = mongoose.model("flightData", flightSchema);
let ticketData = mongoose.model("ticketData", ticketSchema);

// GET REQUESTS
// get request get-data to get all users
app.get("/get-data", function (req, res) {
  //to get all users
  UserData.find().then(function (doc) {
    console.log("all users " + doc);
  });
});

app.get("/userallflight",function(req, res)  {
  flightData.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
app.get("/myFlights",function(req, res)  {
  flightData.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      var dataNew = new Array();
      UserData.findById(userID, (error, dataUser) => {
        if (error) {
          return next(error)
        } else {
          var toChange = dataUser.flightsID;// this is the value to check (I need to change it to flights and not last name)
          console.log(toChange)
          var temp = new Array();
          temp = toChange.split(",");
          console.log("dssssssssssssss");
          console.log(temp);
          for(var i = 0 ; i < temp.length;i++){
            for(var j = 0 ; j < data.length;j++){
              
              if(temp[i]== data[j]._id){
                dataNew.push(data[j]);
                j=data.length;
              }
            }
          }
          console.log("ana henaaaa")
          console.log(dataNew);
          res.json(dataNew)
        }
          
        });
        
      
    }
  })
});

app.get("/get-all-flights", function (req, res) {
  //to get all users
  flightData.find().then(function (doc) {
    res.status(200).json({ data: doc });
  });
});

app.post("/get-seats", async (req, res) => {
  const flight_id = req.body?.flight_id;
  const flight = await flightData.findById(flight_id);
  console.log(flight);
  res.status(201).send({ seat: flight["Seats"] });
});
app.post("/get-flights", async function (req, res) {
  //to get all users
  console.log(req.body.querry);
  const querry = req.body.querry;
  const returned_response = await create_functional_querry_from_request(querry);
  res.status(200).send({ data: returned_response });
});

// POST REQUESTS
app.post("/", (req, res) => {
  console.log("request sent", req.body);
});
// post request to post a user
app.post("/RegisterUser", function (req, res) {
  console.log(
    "in the post method server resived post request with body:\n" +
      JSON.stringify(req.body)
  );
  const {
    user_email,
    user_password,
    user_passport_number,
    user_first_name,
    user_last_name,
    user_home_address,
    user_nickname,
    user_contry_code,
    user_telephone_number,
  } = req.body;
  var item = {
    email: user_email,
    password: user_password,
    nickname: user_nickname,
    first_name: user_first_name,
    last_name: user_last_name,
    home_address: user_home_address,
    contry_code: user_contry_code,
    telephone_number: user_telephone_number,
    passport: user_passport_number,
    flightsID : "",
    ticketsID : "",
  };
  var data = new UserData(item);
  data
    .save()
    .then((doc) => {
      console.log("saved sucess " + doc);
      res.status(200).json({ status: "ok" }); // this means that it was great and it worked quiet well if i can say so myself
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/RegisterFlight", function (req, res) {
  console.log(
    "in the post method server resived post request with body:\n" +
      JSON.stringify(req.body)
  );
  const {
    id,
    name,
    seat_number,
    duration,
    arrival_time,
    departure_time,
    from,
    to,
    price,
    baggage_allowance,
    BusinessClass_seats,
    Economy_seats,
  } = req.body;
  // TODO: first class seats == buissness class seats
  var item = {
    id: id,
    name: name,
    seat_number: seat_number,
    duration: timeDiffCalc(
      Date.parse(arrival_time),
      Date.parse(departure_time)
    ), // departure_time.diff(arrival_time, 'hours'),
    arrival_time: arrival_time,
    departure_time: departure_time,
    from: from,
    to: to,
    price: price,
    baggage_allowance: baggage_allowance,
    BusinessClass_seats: BusinessClass_seats,
    Economy_seats: Economy_seats,
    FirstClass_seats: BusinessClass_seats,
    SeatsLeft:
      parseInt(BusinessClass_seats) +
      parseInt(Economy_seats) +
      parseInt(BusinessClass_seats),
    Seats: CreateSeatsObject(
      Economy_seats,
      BusinessClass_seats,
      BusinessClass_seats // this is not truly correct but assume # of first class seats == buissness class seats TODO:
    ),
  };
  var data = new flightData(item);
  data
    .save()
    .then((doc) => {
      console.log("saved sucess " + doc);
      res.status(200).json({ status: "ok" }); // this means that it was great and it worked quiet well if i can say so myself
    })
    .catch((err) => {
      console.error(err);
    });
});
 app.get("/addToFavourite/:id",function(req,res){
  UserData.findById(userID, (error, data) => {
        if (error) {
          return next(error)
        } else {
            var toChange = data.flightsID;// this is the value to check (I need to change it to flights and not last name)
            var temp = new Array();
            temp = toChange.split(",");
            var duplicate = 0;
            console.log(temp);
              for (var j=0; j<temp.length; j++) {//to check if the flight is already reserved
                  if (temp[j].match(req.params.id)) duplicate=1 ;
              }
              
          if(duplicate !=1){
            if(toChange==""){//msh 3arf leh how msh byd5ol hena
              var flights =  req.params.id ;
            }
            else{
               var flights = toChange + "," +req.params.id ;
              }
          var flighttoAdd = { $set: { flightsID: flights } };
          var IDold = {_id: userID};
          
          UserData.updateOne(IDold, flighttoAdd, function(err, res) {
            if (err) throw err;
          
            //db.close();
          });}
          else{
            //hena 3ayz atl3 error en howa 3ml reserve l flight howa already kan 3mlha reserve
          }
          
          res.json(data)
        }
 })

 });
 app.get("/cancelflight/:id",function(req,res){
  UserData.findById(userID, (error, data) => {
        if (error) {
          return next(error)
        } else {

            var toChange = data.last_name;// this is the value to check (I need to change it to flights and not last name)
            var temp = new Array();
            temp = toChange.split(",");
            var j = 0;
              for ( j=0; j<temp.length; j++) {
                  if (temp[j].match(req.params.id)) break ;
              }
              var flights ="";
            for(var i = 0 ; i < temp.length ; i++){
              if(i!=j){
                if(i==0){
                    flights = temp[i] + "";
                }
                else{
                  flights = flights+ ","+temp[i]
                }
              }
            }
          var flighttoAdd = { $set: { flightsID: flights } };
          var IDold = {_id: userID};
          
          UserData.updateOne(IDold, flighttoAdd, function(err, res) {
            if (err) throw err;
          
            //db.close();
          });
          var message="";
          flightData.findById(req.params.id, (error, dataflight) => {
            if (error) {
              return next(error)
            } else {
              var mail = data.email + "";
               message = "Hello,"+ data.first_name + " "+data.last_name +", your flight from "+dataflight.from+" to "+dataflight.to+" has been cancelled." + "An amout of "+dataflight.price+" EGP will be refunded within 3 working days.";
               const options ={
                from:"AlmazaAirport@outlook.com", //mail el sender
                to:mail,//el mafrood mail
                subject:"Flight Cancellation",
                text:message
              };
              transporter.sendMail(options,function(err,info){
                if(err){
                  console.log(err);
                }
                else{
                  console.log("Sent");
                }
              })
            }
          });
          
          
          
          res.json(data)
        }
 })

 });

app.post("/LoginUser", function (req, res) {
  console.log(
    "in the post method server resived post request with body:\n" +
      JSON.stringify(req.body)
  );
  console.log(req.body.user_email);
  console.log(req.body.user_password);

  let querry = {
    email: req.body.user_email,
    password: req.body.user_password,
  };
  UserData.findOne(querry)
    .then(function (doc) {
      if (doc) {
        console.log("found user login successfull" + doc);
        res.status(200).json({ status: "ok", success: true, err: null }); // this means that it was great and it worked quiet well if i can say so myself
        
        userID =doc._id;
        console.log("the id of the user is");
        console.log(userID);
      } else {
        //nothing found then return bad
        console.log("no user found with " + querry);
        res
          .status(200)
          .json({ status: "ok", success: false, err: "Invalid Credentials" });
      }
    })
    .catch((err) => console.error(err));
});

app.post("/ReserveSeats", async (req, res) => {
  console.log("reserving seats:\n" + JSON.stringify(req.body));
  const { flight_id, reserved_seats, seat_class } = req.body;
  const flight = await flightData.findById(flight_id).then((doc) => {
    for (const reserved_seat of reserved_seats) {
      doc.Seats[seat_class].set(reserved_seat, "taken"); // setting these seats to taken in this seat class
    }
    
    doc.save().then((old_doc) => {
      console.log(`saved seats  successfully and remaingin seats are ${doc.SeatsLeft}`);
      res.status(200).json({ status: "ok", success: true, err: null }); // this means that it was great and it worked quiet well if i can say so myself
    });
    
  });
});

app.post("/DecreaseSeats", async (req, res) => {
  console.log("decrasing seat number by seats:\n" + JSON.stringify(req.body));
  const { flight_id, number_of_seats } = req.body;
  const flight = await flightData.findById(flight_id).then((doc) => {
    doc.SeatsLeft = doc.SeatsLeft-number_of_seats;
    if(doc.SeatsLeft<0){
      doc.SeatsLeft = 0;
    }

    doc.save().then((old_doc) => {
      console.log(
        `remaining seats are now ${doc.SeatsLeft}`
      );
      res.status(200).json({ status: "ok", success: true, err: null }); // this means that it was great and it worked quiet well if i can say so myself
    });
  });
});

export default app;
