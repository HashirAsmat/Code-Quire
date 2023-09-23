import jwt from "jsonwebtoken";
import config from '../config/index.js'


class JWTService{
   
   static signAccessToken(payload,expiryTime){
       return jwt.sign(payload,config.ACCESS_TOKEN_SECRET,{expiresIn: expiryTime});
    }

   static verifyAccessToken(token){
       return jwt.verify(token,config.ACCESS_TOKEN_SECRET); //jwt.verify return aan object that contain payload i-e in our case as a key.
    }
}
export default JWTService;