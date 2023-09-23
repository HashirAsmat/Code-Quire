import mongoose from "mongoose";
import config from "../config/index.js";

async function connectionBD(){
    try{
        const DB = await mongoose.connect(config.MONGODB_CONNECTION_STRING, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`DATABASE CONNECTED:${DB.connection.name}`);
    }
    catch(err){
        console.log(err);
    }
}
export default connectionBD;