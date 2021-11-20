import Express  from "express";
import Mongoose  from "mongoose";
import cors from 'cors';

console.log('server is running')

const app = Express();
const port = 5000;

app.use(Express.json({'limit':'30mb', extended:"true"})); //Used to parse JSON bodies
app.use(Express.urlencoded({ limit: '30mb', extended: "true" }));

app.use(cors({ origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,}))
app.listen(port, function () {
  console.log("Server listening on http://localhost:" + port);
});
// 

app.post('/', (req, res)=>{
    console.log('request sent', req.body)
})

