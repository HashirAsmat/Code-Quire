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


