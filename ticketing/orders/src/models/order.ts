import mongoose from "mongoose";
import {OrderStatus} from "@kamranmoazimorg/common";

import { TicketDoc } from './ticket';


// * An interface that describes the properties 
// * that are required to create a new Order
interface OrderAttrs {
    userId:string;
    status:OrderStatus;
    expiresAt:Date;
    ticket:TicketDoc;
};


// * An interface that describes the properties
// * that a Order Document has
interface OrderDoc extends mongoose.Document {
    userId:string;
    status:OrderStatus;
    expiresAt:Date;
    ticket:TicketDoc;
};


// * An interface that describes the properties
// * that a Order Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs:OrderAttrs):OrderDoc;
};



const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Ticket",
        required: true
    },
}, {
    toJSON:{
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    }
});


orderSchema.statics.build = (attrs:OrderAttrs) => {
    return new Order(attrs);
}



const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);


export {Order, OrderStatus};
