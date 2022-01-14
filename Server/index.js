import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import crypto, { createCipheriv, createHash, randomBytes } from "crypto";
//
import userDataSchema from "./models/UserDataSchema.js";
import flightSchema from "./models/FlgihtsSchema.js";
import ticketSchema from "./models/TicketSchema.js";
import { timeDiffCalc } from "./util/diffrenceHours.js";
import { create_functional_querry_from_request } from "./util/querry_func.js";
import CreateSeatsObject from "./util/CreateSeatsObject.js";
console.log("server is running");
var userID; //id of signed in user
const app = express();
const Schema = mongoose.Schema;
const userValidate = (res) => {
  console.log(`user was ${userID}`);
  if (userID == undefined) {
    res.status(403).send({ error: "not-logged in" });
  }
};

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
  service: "hotmail",
  auth: {
    user: "AlmazaAirport@outlook.com",
    pass: "AhmedMaherT346-3200",
  },
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
app.get("/get-all-users", async function (req, res) {
  //to get all users
  const data = await UserData.find();
  res.status(200).send({ users: data });
});

app.post("/get-user", async (req, res) => {
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  let user = await UserData.findOne({ _id: userID });
  res.status(200).send({ user: user });
});

app.post("/get-flight", async (req, res) => {
  let _id = req.body.flight_id;
  let flight = await flightData.findOne({ _id, _id });
  res.status(200).send({ flight: flight });
});

app.get("/userallflight", function (req, res) {
  flightData.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
app.get("/myFlights", async function (req, res) {
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  flightData.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      var dataNew = new Array();
      UserData.findById(userID, (error, dataUser) => {
        if (error) {
          return next(error);
        } else {
          var toChange = dataUser.flightsID; // this is the value to check (I need to change it to flights and not last name)
          console.log(toChange);
          var temp = new Array();
          temp = toChange.split(",");

          for (var i = 0; i < temp.length; i++) {
            for (var j = 0; j < data.length; j++) {
              if (temp[i] == data[j]._id) {
                dataNew.push(data[j]);
                j = data.length;
              }
            }
          }
          console.log("ana henaaaa");
          console.log(dataNew);
          res.json(dataNew);
        }
      });
    }
  });
});
app.get("/myReservedFlights", async function (req, res) {
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  ticketData.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      var dataNew = new Array();
      UserData.findById(userID, (error, dataUser) => {
        if (error) {
          return next(error);
        } else {
          var toChange = dataUser.ticketsID; // this is the value to check (I need to change it to flights and not last name)
          console.log(toChange);
          var temp = new Array();
          temp = toChange.split(",");
          for (var i = 0; i < temp.length; i++) {
            for (var j = 0; j < data.length; j++) {
              if (temp[i] == data[j]._id) {
                dataNew.push(data[j]);
                j = data.length;
              }
            }
          }

          res.json(dataNew);
        }
      });
    }
  });
});
app.get("/get-all-flights", async function (req, res) {
  //to get all users
  flightData.find().then(function (doc) {
    res.status(200).json({ data: doc });
  });
});

app.post("/updateUser", async function (req, res, next) {
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  console.log(req.body);
  console.log(userID);
  var editusername = { $set: { username: req.body.username } };///fee ehhhhhhhh 5555555555
  var edituseremail = { $set: { email: req.body.email } };
  var editusernickname = { $set: { nickname: req.body.nickname } };
  var edituserpassword = { $set: { password: req.body.password } };
  var edituserfirstname = { $set: { first_name: req.body.first_name } };
  var edituserlastname = { $set: { last_name: req.body.last_name } };
  var edituserphone = { $set: { telephone_number: req.body.telephone_number } };
  var edituseraddress = { $set: { home_address: req.body.home_address } };
  var edituserpassport = { $set: { passport: req.body.passport } };

  var IDold = { _id: userID };

  UserData.updateOne(IDold, edituseremail, function (err, res) {
    if (err) throw err;
  });
  UserData.updateOne(IDold, edituseraddress, function (err, res) {
    if (err) throw err;
  });
  UserData.updateOne(IDold, editusername, function (err, res) {
    if (err) throw err;
  });
  UserData.updateOne(IDold, edituserfirstname, function (err, res) {
    if (err) throw err;
  });
  UserData.updateOne(IDold, edituserlastname, function (err, res) {
    if (err) throw err;
  });
  UserData.updateOne(IDold, editusernickname, function (err, res) {
    if (err) throw err;
  });
  UserData.updateOne(IDold, edituserpassword, function (err, res) {
    if (err) throw err;
  });
  UserData.updateOne(IDold, edituserpassport, function (err, res) {
    if (err) throw err;
  });
  UserData.updateOne(IDold, edituserphone, function (err, res) {
    if (err) throw err;
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

app.post("/get-ticket", async function (req, res) {
  //to get all users
  const ticket_id = req.body.ticket_id;
  // Get ticket info
  const ticket = await ticketData.findById(ticket_id);
  const { IDUser, IDFlight } = ticket;
  const user = await userData.findById(IDUser);
  const flight = await flightData.findById(IDFlight);

  res.status(200).send({ user: user, flight: flight, ticket: ticket });
});
app.post("/get-user-tickets", async function (req, res) {
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  const data = await ticketData.find({ IDUser: userID });
  console.log(userID, data);
  res.status(200).send({ tickets: data });
});

app.get("/get-all-tickets", async (req, res) => {
  console.log("get all tickets");
  const data = await ticketData.find();
  res.status(200).send({ tickets: data });
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
    email,
    password,
    username,
    passport_number,
    first_name,
    last_name,
    home_address,
    nickname,
    contry_code,
    telephone_number,
  } = req.body;
  var item = {
    email: email,
    password: password,
    username: username,
    nickname: nickname,
    first_name: first_name,
    last_name: last_name,
    home_address: home_address,
    contry_code: contry_code,
    telephone_number: telephone_number,
    passport: passport_number,
    flightsID: "",
    ticketsID: "",
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

app.post("/RegisterFlight", async function (req, res) {
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
app.get("/addToFavourite/:id", async function (req, res) {
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  UserData.findById(userID, (error, data) => {
    if (error) {
      return next(error);
    } else {
      var toChange = data.flightsID; // this is the value to check (I need to change it to flights and not last name)
      var temp = new Array();
      temp = toChange.split(",");
      var duplicate = 0;
      console.log(temp);
      for (var j = 0; j < temp.length; j++) {
        //to check if the flight is already reserved
        if (temp[j].match(req.params.id)) duplicate = 1;
      }

      if (duplicate != 1) {
        if (toChange == "") {
          //msh 3arf leh how msh byd5ol hena
          var flights = req.params.id;
        } else {
          var flights = toChange + "," + req.params.id;
        }
        var flighttoAdd = { $set: { flightsID: flights } };
        var IDold = { _id: userID };
        console.log(`updated ${userID} with ${flights}`);
        UserData.updateOne(IDold, flighttoAdd, function (err, res) {
          if (err) throw err;

          //db.close();
        });
      } else {
        //hena 3ayz atl3 error en howa 3ml reserve l flight howa already kan 3mlha reserve
      }

      res.json(data);
    }
  });
});
app.get("/cancelflight/:id", async function (req, res) {
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  UserData.findById(userID, (error, data) => {
    if (error) {
      return next(error);
    } else {
      ticketData.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          var flight = data.IDFlight;
          var class_cabin = data.Cabin_Class;
          flightData.findById(flight, (error, dataf) => {
            if (error) {
              return next(error);
            } else {
              if (class_cabin == "first") {
                var changer = dataf.firstclass_seats + 1;
                var flighttoAdd = { $set: { firstclass_seats: changer } };
                var IDold = { _id: flight };

                flightData.updateOne(IDold, flighttoAdd, function (err, res) {
                  if (err) throw err;
                });
              } else if ((class_cabin = "economy")) {
                var changer = dataf.Economy_seats + 1;
                var flighttoAdd = { $set: { Economy_seats: changer } };
                var IDold = { _id: flight };

                flightData.updateOne(IDold, flighttoAdd, function (err, res) {
                  if (err) throw err;
                });
              } else if ((class_cabin = "business")) {
                var changer = dataf.BusinessClass_seats + 1;
                var flighttoAdd = { $set: { BusinessClass_seats: changer } };
                var IDold = { _id: flight };

                flightData.updateOne(IDold, flighttoAdd, function (err, res) {
                  if (err) throw err;
                });
              }
            }
          });
        }
      });
      var toChange = data.ticketsID; // this is the value to check (I need to change it to flights and not last name)
      var temp = new Array();
      temp = toChange.split(","); ///tickets id
      var j = 0;
      for (j = 0; j < temp.length; j++) {
        if (temp[j].match(req.params.id)) break;
      }
      var flights = "";
      for (var i = 0; i < temp.length; i++) {
        if (i != j) {
          if (i == 0) {
            flights = temp[i] + "";
          } else {
            flights = flights + "," + temp[i];
          }
        }
      }
      var flighttoAdd = { $set: { ticketsID: flights } };
      var IDold = { _id: userID };

      UserData.updateOne(IDold, flighttoAdd, async function (err, res) {
        if (err) throw err;

        //db.close();
      });
      var message = "";
      ticketData.findById(req.params.id, (error, dataflight) => {
        if (error) {
          return next(error);
        } else {
          var mail = data.email + "";
          message =
            "Hello," +
            data.first_name +
            " " +
            data.last_name +
            ", your flight from " +
            dataflight.from +
            " to " +
            dataflight.to +
            " has been cancelled." +
            "An amout of " +
            dataflight.price +
            " EGP will be refunded within 3 working days.";
          const options = {
            from: "AlmazaAirport@outlook.com", //mail el sender
            to: mail, //el mafrood mail
            subject: "Flight Cancellation",
            text: message,
          };
          transporter.sendMail(options, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log("Sent");
            }
          });
        }
      });

      res.json(data);
    }
  });
});
app.get("/removefromFavourite/:id", async function (req, res) {
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  UserData.findById(userID, (error, data) => {
    if (error) {
      return next(error);
    } else {
      var toChange = data.flightsID; // this is the value to check (I need to change it to flights and not last name)
      var temp = new Array();
      temp = toChange.split(",");
      var j = 0;
      for (j = 0; j < temp.length; j++) {
        if (temp[j].match(req.params.id)) break;
      }
      var flights = "";
      for (var i = 0; i < temp.length; i++) {
        if (i != j) {
          if (i == 0) {
            flights = temp[i] + "";
          } else {
            flights = flights + "," + temp[i];
          }
        }
      }
      var flighttoAdd = { $set: { flightsID: flights } };
      var IDold = { _id: userID };

      UserData.updateOne(IDold, flighttoAdd, function (err, res) {
        if (err) throw err;

        //db.close();
      });

      res.json(data);
    }
  });
});
app.get("/cancelflight/:id", async function (req, res) {
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  UserData.findById(userID, (error, data) => {
    if (error) {
      return next(error);
    } else {
      ticketData.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          var flight = data.IDFlight;
          //var seat = data.Cabin_Class;
          flightData.findById(flight, (error, dataf) => {
            if (error) {
              return next(error);
            } else {
              //TODO Karim Samir to be able to free seats
              var changer = dataf.seat_number + 1;
              var flighttoAdd = { $set: { seat_number: changer } };
              var IDold = { _id: flight };

              flightData.updateOne(IDold, flighttoAdd, function (err, res) {
                if (err) throw err;
              });
            }
          });
        }
      });
      var toChange = data.ticketsID; // this is the value to check (I need to change it to flights and not last name)
      var temp = new Array();
      temp = toChange.split(","); ///tickets id
      var j = 0;
      for (j = 0; j < temp.length; j++) {
        if (temp[j].match(req.params.id)) break;
      }
      var flights = "";
      for (var i = 0; i < temp.length; i++) {
        if (i != j) {
          if (i == 0) {
            flights = temp[i] + "";
          } else {
            flights = flights + "," + temp[i];
          }
        }
      }
      var flighttoAdd = { $set: { ticketsID: flights } };
      var IDold = { _id: userID };

      UserData.updateOne(IDold, flighttoAdd, function (err, res) {
        if (err) throw err;

        //db.close();
      });
      var message = "";
      ticketData.findById(req.params.id, (error, dataflight) => {
        if (error) {
          return next(error);
        } else {
          var mail = data.email + "";
          message =
            "Hello," +
            data.first_name +
            " " +
            data.last_name +
            ", your flight from " +
            dataflight.from +
            " to " +
            dataflight.to +
            " has been cancelled." +
            "An amout of " +
            dataflight.price +
            " EGP will be refunded within 3 working days.";
          const options = {
            from: "AlmazaAirport@outlook.com", //mail el sender
            to: mail, //el mafrood mail
            subject: "Flight Cancellation",
            text: message,
          };
          transporter.sendMail(options, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log("Sent");
            }
          });
        }
      });

      res.json(data);
    }
  });
});

app.post("/createTicket", async (req, res) => {
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  const { flight_id, seat_nr, price } = req.body;
  console.log(`create ticket from user ${userID} from ${flight_id}`);
  const flight_data = await flightData.findById(flight_id);
  const { flightNr, from, to, arrival_time, departure_time } = flight_data;
  let item = {
    IDUser: userID,
    IDFlight: flight_id,
    flightNr: flightNr,
    seat_number: seat_nr, //dy msh 3arf 3yznha wla l2
    from: from, // contry name
    to: to, //country name
    arrival_time: arrival_time,
    departure_time: departure_time,
    price: price,
  };

  const ticket = await new ticketData(item);
  ticket.save();
  console.log(`saved ticket ${ticket}`);
  //const user = await UserData.findById(userID);
  // // Changeing the user data
  // var toChange = user.ticketsID;
  // var temp = new Array();
  // var newtickets = "";
  // temp = toChange.split(",");
  // if (temp.length == 0) {
  //   newtickets = ticket._id;
  // } else {
  //   for (var i = 0; i < temp.length; i++) {
  //     if (i == 0) {
  //       newtickets = temp[i];
  //     } else {
  //       newtickets = newtickets + "," + temp[i];
  //     }
  //   }
  // }
  // let ticketsUpdated = { $set: { ticketsID: newtickets } }; // update tickets with new tickets
  // var IDold = { _id: userID };
  // const user_new = await UserData.updateOne(IDold, ticketsUpdated);
  // console.log(`updated user and created ticket ${user_new["ticketsID"]}`);
  res.status(200).send({ status: "ok", msg: "seats booked" });
});

app.post("/CancelTicket", async (req, res) => {
  const { ticket_id, seat_nr, flight_id } = req.body;
  await ticketData.findOneAndRemove({ _id: ticket_id });
  console.log(`deleted ticket ${ticket_id}`);
  let flight = await flightData.findById(flight_id);
  let seat_type = "";
  if (seat_nr.includes("E")) {
    seat_type = "EconomySeats";
  } else if (seat_nr.includes("B")) {
    seat_type = "BusinessSeats";
  } else if (seat_nr.includes("F")) {
    seat_type = "FirstClassSeats";
  }
  flight["Seats"][seat_type][seat_nr] = 'free'
  await flight.save()
  console.log(`changed seat ${seat_nr} to free from ${seat_type}`)
  res.status(200).send({success:true})
});
app.post("/LoginUser", function (req, res) {
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
    username: req.body.user_email,
    password: req.body.user_password,
  };
  //console.log(querry)
  UserData.findOne(querry)
    .then(function (doc) {
      if (doc) {
        console.log("found user login successfull" + doc);
        res.status(200).json({ status: "ok", success: true, err: null }); // this means that it was great and it worked quiet well if i can say so myself

        userID = doc._id;
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
      console.log(
        `saved seats  successfully and remaingin seats are ${doc.SeatsLeft}`
      );
      res.status(200).json({ status: "ok", success: true, err: null }); // this means that it was great and it worked quiet well if i can say so myself
    });
  });
});

app.post("/DecreaseSeats", async (req, res) => {
  console.log("decrasing seat number by seats:\n" + JSON.stringify(req.body));
  const { flight_id, number_of_seats } = req.body;
  const flight = await flightData.findById(flight_id).then((doc) => {
    doc.SeatsLeft = doc.SeatsLeft - number_of_seats;
    if (doc.SeatsLeft < 0) {
      doc.SeatsLeft = 0;
    }

    doc.save().then((old_doc) => {
      console.log(`remaining seats are now ${doc.SeatsLeft}`);
      res.status(200).json({ status: "ok", success: true, err: null }); // this means that it was great and it worked quiet well if i can say so myself
    });
  });
});

app.post('/EditUser', async (req, res)=>{
  if (userID == undefined) {
    await res.status(403).send({ error: "not-logged in" });
    return;
  }
  let updated_user_info = req.body
  
  await UserData.updateOne({_id:userID}, updated_user_info)
  console.log(
    `updating user ${userID} with ${JSON.stringify(updated_user_info)}`
  );

  res.status(200).send({msg:'User Updated'})
})

export default app;
