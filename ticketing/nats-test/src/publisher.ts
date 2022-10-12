'use-strict'

import nats from "node-nats-streaming"

import {randomBytes} from "crypto"
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";



// stan is actully client  (just naming convention)
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url:"http://localhost:4222"
});

stan.on("connect", async () => {

    let publisher = new TicketCreatedPublisher(stan);
    
    await publisher.publish({
        id:"3231",
        title:"first ticket",
        price:12.55
    })


    // let data = JSON.stringify({
    //     id:"3231",
    //     title:"first ticket",
    //     price:12.55
    // })
    
    // stan.publish("tickets:created", data, () => {
    //     console.log("Event Published Successfully");
    // })
    
})

