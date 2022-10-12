import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subject";
import { TicketCreatedEvent } from './ticket-created-event';



export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject:TicketCreatedEvent["subject"] = Subjects.TicketCreated;
    queueGroupName: string = "payments-service";
    
    onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
        console.log("Event data: ", data);
        msg.ack();
    }
};