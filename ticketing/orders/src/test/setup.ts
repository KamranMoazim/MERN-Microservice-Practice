import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});



export function signin() {

  // * build jwt payload i.e. {id, email}
  const payload = {
      id: "1",
      email: "test@test.com"
  };

  // * create JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // console.log(process.env.JWT_KEY)

  // * build session Object. { jwt:MY_JWT }
  const session = { jwt: token };

  // * turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // * take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // * returns a string thats cookie with encoded data
  return [`session=${base64}`];
}