import express from "express"
import "express-async-errors"

import {json} from "body-parser"
import cookieSession from "cookie-session";

import { errorHanlder, NotFoundError, currentUser } from "@kamranmoazimorg/common"


import {createTicketRouter} from "./routes/new";
import {showTicketRouter} from "./routes/show";
import {updateTicketRouter} from "./routes/update";
import {indexTicketRouter} from "./routes/index";


const app = express();
app.set("trust proxy", true)
app.use(json())
app.use(cookieSession({
    signed:false,
    secure: process.env.NODE_ENV !== "test"

}));
app.use(currentUser);

app.use(showTicketRouter);
app.use(createTicketRouter);
app.use(updateTicketRouter);
app.use(indexTicketRouter);


app.all("*", async () => {
    throw new NotFoundError();
})

app.use(errorHanlder)


export {app};