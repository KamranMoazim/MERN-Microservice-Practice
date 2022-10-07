import mongoose from "mongoose";

import {app} from "./app";

const PORT = 3000;

const startUp = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }

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