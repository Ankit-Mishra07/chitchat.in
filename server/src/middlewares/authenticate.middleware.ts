import jwt from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";

const verifyToken = (token:string) => {
        return jwt.verify(token,`${process.env.JWT_ACCESS_KEY}`)
}

const authenticateLogin = async (req:Request,res:Response,next:NextFunction) => {
    // if we received the bearer token in the header

    const bearerToken = req.headers.authorization;

    // if not received or token is not a bearer token then we will throw an error 

    if(! bearerToken || !bearerToken.startsWith("Bearer ")) return res.status(400).json({status: "failed",message:"Please provide a valid token"})

    // else we will try to get the user from the token 
    const token = bearerToken.split(" ")[1];
  
    let user:string | jwt.JwtPayload;
    try {
        user = verifyToken(token)
    } catch (e) {
        return res.status(500).json({message: "Please provide a valid token"})
    }

    // if no user found then we will throw an error
    if(!user) 
    return res.status(400).json({message: "Please provide a valid token"})

    // else we will attach the user to the request body
    req.body.user = user;

    // return next
    return next();
}

export default authenticateLogin;
