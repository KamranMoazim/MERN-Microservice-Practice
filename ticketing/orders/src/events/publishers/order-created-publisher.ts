import { Subjects, Publisher, OrderCreatedEvent } from "@kamranmoazimorg/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}