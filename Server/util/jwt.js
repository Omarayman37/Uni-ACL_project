import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
export const get_user_from_token = async (token)=>{
    try {
  const user = await jwt.verify(token, process.env.TOKEN_SECRET);  
    } catch (error) {
        return null
    }
  return user
}

export const create_token= (data)=>{
    console.log(`the payload to token is ${JSON.stringify(data)}`)
    let token = jwt.sign(JSON.stringify(data), process.env.API_KEY);
    return  token
}