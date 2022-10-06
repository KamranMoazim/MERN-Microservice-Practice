import express from "express"
import "express-async-errors"

import mongoose from "mongoose";

import {json} from "body-parser"

import {currentUserRouter} from "./routes/current-user"
import {signinRouter} from "./routes/signin"
import {signoutRouter} from "./routes/signout"
import {signupRouter} from "./routes/signup"
import { errorHanlder } from "./middleware/error-handler"
import { NotFoundError } from "./errors/not-found-error"



const PORT = 3000;

const app = express();
app.use(json())


app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all("*", async () => {
    throw new NotFoundError();
})

app.use(errorHanlder)


const startUp = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("auth service connected to DB")
    } catch (error) {
        console.log("error connecting to DB ", error)
    }
    
    app.listen(PORT, () => {
        console.log(`Auth Service Server started at port ${PORT}!`)
    });

}

startUp();