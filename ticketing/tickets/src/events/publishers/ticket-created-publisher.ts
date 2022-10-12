import { Publisher, Subjects, TicketCreatedEvent } from "@kamranmoazimorg/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
