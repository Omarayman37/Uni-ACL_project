import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const get_user_from_token = (token) => {
  try {
    console.log(process.env.TOKEN_SECRET)
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    return user;
  } catch (error) {
    console.error(error)
    return null;
  }
};

export const create_token = (data) => {
  console.log(`the payload to token is ${JSON.stringify(data)}`);
  let token = jwt.sign(JSON.stringify(data), process.env.API_KEY);
  return token;
};
