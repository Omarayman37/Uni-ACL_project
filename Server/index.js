import express  from "express";
import mongoose from "mongoose";
import cors from 'cors';
//
import userDataSchema from './models/UserDataSchema.js'; 
//
console.log('server is running')

const app = express();
const Schema = mongoose.Schema

app.use(express.json({'limit':'30mb', extended:"true"})); //Used to parse JSON bodies
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors({ origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,}))

// Connect to DB and Server
const CONNECTION_URL =
  "mongodb+srv://hazemeffat93:hazem750@cluster0.ryp3q.mongodb.net/Cluster0?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, UseUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port:${PORT}`))
  )
  .catch((error) => console.log(error.message));


// Data Models
var UserData = mongoose.model("UserData", userDataSchema);

// GET REQUESTS
// get request get-data to get all users
app.get("/get-data", function (req, res) {
  //to get all users
  UserData.find().then(function (doc) {
    console.log("all users " + doc);
  });
});

// POST REQUESTS
app.post("/", (req, res) => {
  console.log("request sent", req.body);
});
// post request to post a user
app.post("/insert", function (req, res) {
  var item = {
    Email: req.body.Email,
    Password: req.body.Password,
    Nickname: req.body.Nickname,
  };
  var data = new UserData(item);
  data
    .save()
    .then((doc) => {
      console.log("saved sucess " + doc);
    })
    .catch((err) => {});
});

export default app;