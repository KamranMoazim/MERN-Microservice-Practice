import { Subjects, Publisher, OrderCancelledEvent } from "@kamranmoazimorg/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}