import request from "supertest";

import { app } from "../../app";


it("fails when email does not exist", async () => {
    return request(app)
            .post("/api/users/signin")
            .send({
                email:"test@test.com",
                password:"password"
            })
            .expect(400);
})


it("fails when incorrect password is supplied", async () => {
    await request(app)
            .post("/api/users/signup")
            .send({
                email:"test@test.com",
                password:"password"
            })
            .expect(201);

    return request(app)
            .post("/api/users/signin")
            .send({
                email:"test@test.com",
                password:"password-incorrect"
            })
            .expect(400);
})



it("sets cookies when valid credentials are provided", async () => {
    await request(app)
            .post("/api/users/signup")
            .send({
                email:"test@test.com",
                password:"password"
            })
            .expect(201);

    const response = await request(app)
            .post("/api/users/signin")
            .send({
                email:"test@test.com",
                password:"password"
            })
            .expect(200);
    
    expect(response.get("Set-Cookie")).toBeDefined();
})

