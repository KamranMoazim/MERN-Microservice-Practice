import { Publisher, Subjects, TicketUpdatedEvent } from "@kamranmoazimorg/common";


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
