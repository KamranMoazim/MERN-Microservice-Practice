import mongoose from "mongoose";

import {natsWrapper} from "./nats-wrapper";
import {app} from "./app";

const PORT = 3000;

const startUp = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS_CLIENT_ID must be defined");
    }

    if (!process.env.NATS_URL) {
        throw new Error("NATS_URL must be defined");
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS_CLUSTER_ID must be defined");
    }

    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed!");
            process.exit()
        });
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());

        await mongoose.connect(process.env.MONGO_URI);
        console.log("auth service connected to DB")
    } catch (error) {
        console.log("error connecting to DB ", error)
    }
    
    app.listen(PORT, () => {
        console.log(`Tickets Service Server started at port ${PORT}!`)
    });

}

startUp();