import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@kamranmoazimorg/common';

import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';




const EXPIRATION_WINDOW_SECONDS = 15*60;


const router = express.Router();


router.post('/api/orders', requireAuth, [
  body("ticketId")
    .not()
    .isEmpty()
    .withMessage("TicketId is required")
], validateRequest, async (req: Request, res: Response) => {

  const {ticketId} = req.body;

  // find the ticket in DB about which we wants to create order
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new NotFoundError();
  }

  // make sure ticket is not already reserved
  // run query to look at all orders and find that ticket and check if order status is *cancelled*
  // ! way 1
  // const existingOrder = await Order.findOne({
  //   ticket:ticket,
  //   status:{
  //     $in: [
  //       OrderStatus.Created,
  //       OrderStatus.AwaitingPayment,
  //       OrderStatus.Complete,
  //     ]
  //   }
  // })
  // if (existingOrder) {
  //   throw new BadRequestError("Ticket is Already reserved");
  // }
  // ! way 2
  const isReserved = await ticket.isReserved();
  if (isReserved) {
    throw new BadRequestError("Ticket is Already reserved");
  }

  // calculate expireation data for this order
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

  // build order and save it to DB
  const order = Order.build({
    userId:req.currentUser!.id,
    expiresAt:expiration,
    status:OrderStatus.Created,
    ticket:ticket,
  });
  await order.save();

  // publish event saying order created successfully
  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    status: order.status,
    userId: order.userId,
    expiresAt: order.expiresAt.toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  })

  res.status(201).send(order);
});

export { router as newOrderRouter };
