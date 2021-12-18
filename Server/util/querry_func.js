import mongoose  from "mongoose"
import flightSchema from '../models/FlgihtsSchema.js'
let flightData = mongoose.model("flightData", flightSchema);
export const create_functional_querry_from_request = async (querry)=>{
    const search_function = flightData.find()
    if(querry['from'])
        search_function.where('from').equals(querry['from'])
    if(querry['to'])
        search_function.where("to").equals(querry["to"]);
    if(querry['price'])
        search_function.where('price').lte(parseInt(querry['price']))
    if(querry['duration'])
        search_function.where("duration").lte(parseInt(querry['duration']))
    if (querry["id"])
      search_function.where("id").equals((querry["id"]));
     if (querry["start_date"])
      search_function.where("departure_time").gte(querry["start_date"]);
      if (querry["end_date"])
        search_function.where("departure_time").lte(querry["end_date"]);

    // price 

    return await search_function.exec()
}