import request from "supertest";

import { app } from "../../app";
import { signup } from "../../test/test-helper";


it("returns details about the current user", async () => {
    // ! way 1
    // const signupResponse = await request(app)
    //         .post("/api/users/signup")
    //         .send({
    //             email:"test@test.com",
    //             password:"password"
    //         })
    //         .expect(201);
    // const cookie = signupResponse.get("Set-Cookie");

    // ! way 2
    const cookie = await signup();

    const response = await request(app)
            .get("/api/users/currentuser")
            .set("Cookie", cookie)
            .send()
            .expect(200);
    
    // console.log(response.body)
    expect(response.body.currentUser.email).toEqual("test@test.com")

})




it("returns null if user is not authenticated", async () => {

    const response = await request(app)
            .get("/api/users/currentuser")
            .send()
            .expect(200);
    
    // console.log(response.body)
    expect(response.body.currentUser).toEqual(null)

})

