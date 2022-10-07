import express, {Request, Response} from "express";
import {body} from "express-validator"
import jwt from "jsonwebtoken"

import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import { Password } from "../services/Password";
import { validateRequest } from "../middleware/validation-requests";



const router = express.Router();


router.post("/api/users/signin", [
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("You must suppply password"),
        validateRequest,
], async (req:Request, res:Response) => {

    
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(!existingUser){
        throw new BadRequestError("Invalid Credentials");
    }
    
    const passwordMatch = await Password.compare(existingUser.password, password);

    if(!passwordMatch){
        throw new BadRequestError("Invalid Credentials");
    }

    // generate jwt
    const userJwt = jwt.sign(
        {id:existingUser.id, email:existingUser.email}, 
        process.env.JWT_KEY!
    );

    // store jwt in session
    req.session = {
        jwt:userJwt
    }

    res.status(200).send(existingUser);

});


export {router as signinRouter};