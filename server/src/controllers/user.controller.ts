import * as dotenv from "dotenv";
dotenv.config();
import {Request,Response} from "express";
import {Session} from "express-session"
import { Users } from "../models";
import jwt from "jsonwebtoken";

const newToken = (user:Object) => {
    return jwt.sign({ user: user }, `${process.env.JWT_ACCESS_KEY}`);
};

const login = async (req:Request & {session: Session},res:Response) => {
    try {
        const {email,password,username} = req.body;
        // check if the email address provided already exist 
        let user = await Users.findOne({email});
    
        // if it does not exist then throw an error 
        if (!user) return res.status(404).json({ message: "Please provide correct credentials" })
    
        // else we match the password

        const match = await user.checkpassword(password);
    
        // if not match then throw an error
        if (!match) return res.status(400).json({ message: "Please provide correct credentials" })
    
        // if it matches then create the token 
        const token = newToken(user);
    
        // store token in session
        req.session.id = token;
    
        res.status(201).json({user});
        
    } catch (error) {
        console.log(error)
        return res.send({message: "Internal Server Error"});
    }
}

const register = async (req: Request,res:Response) => {
    try {
        // TODO: User image hosted on imgur 

        const {username,email,password} = req.body;

        const user = await Users.findOne({username}).lean().exec();
        if(user){
            return res.send(404).send({message:'User already exist with this Username/Email'});
        }
        console.log(username,email,password)
        try {
            await Users.create({
                username,
                email,
                password
            })
        } catch (error) {
            console.log(error)
            return res.send({message:"Some went wrong"})
        }
        return res.status(200).send({message: "Successfully Registered"});

        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Internal Server Error"});
    }
}


export {login,register}