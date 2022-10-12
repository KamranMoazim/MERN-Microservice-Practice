import { Stan } from "node-nats-streaming";
import { Subjects } from "./subject";



interface Event {
    subject: Subjects;
    data: any
}


export abstract class Publisher<T extends Event> {
    abstract subject:T["subject"];

    private client:Stan;

    constructor(client:Stan){
        this.client = client;
    }

    publish(data:T["data"]) : Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                    console.log("Event Published Successfully to subject ", this.subject);
                }
            })
        })
    }
}