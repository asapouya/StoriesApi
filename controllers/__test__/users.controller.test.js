let server;
const request = require("supertest");
const Users = require("../../models/users.model");

describe("/v1/users", () => {

    beforeEach(() => server = require("../../index"));
    afterEach(async () => {
        server.close();
        await Users.deleteMany({});
    });

    describe("POST /", () => {
        jest.setTimeout(20000);
        it("should post a new user", async () => {
            
            const res = await request(server)
                .post("/v1/users")
                .send({
                    username: "test",
                    email: "test@gmail.com",
                    password: "TestPassword1234@"
                });

            expect(res.statusCode).toBe(201)
            expect(res.body).toMatchObject({state: "Created",data:{username:"test",email:"test@gmail.com"}})
        })
    })
})