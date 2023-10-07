import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export default {
    PORT,
    MONGODB_CONNECTION_STRING,
    ACCESS_TOKEN_SECRET
}


//The code dotenv.config() is used to load environment variables from a .env 
//file into the Node.js process.env object.
