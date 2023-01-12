let server;
const request = require("supertest");
const Books = require("../../models/books.model");
const {generate_admin_token} = require("../../auth/jwt");
const mongoose = require("mongoose");
const fsExtra = require("fs-extra");

describe("/v1/books", () => {

    beforeEach(() => {server = require("../../index")})
    afterEach(async () => {
        await Books.deleteMany({});
        server.close();
        await fsExtra.emptyDir("/home/asapouya/Desktop/StoriesApi/pdfs/pdf_test");        
    });

    describe("POST /", () => {
        jest.setTimeout(30000);
        it("should post a new book", async () => {
            
            const _id = new mongoose.Types.ObjectId().toHexString();
            const token = generate_admin_token(_id, true);
            
            const res = await request(server)
                .post("/v1/books")
                .field({
                    author: "test",
                    title: "author",
                    year_of_publication: "2023",
                    publisher: "test",
                    genre: ["test", "test"],
                    summary: "lorem ipsum"
                }).set("X-auth-token", token)
                .attach("file", "/home/asapouya/Downloads/The Object Oriented Thought Process 3rd Edition.pdf")
        
            //expect(fs.existsSync(res.body.book_pdf_dir)).toBe(true);
            expect(res.statusCode).toBe(201)
            expect(res.body).toMatchObject({state: "Created",
                data:{
                    author: "test",
                    title: "author",
                    year_of_publication: "2023",
                    publisher: "test",
                    genre: ["test", "test"],
                    summary: "lorem ipsum"
                }});
        })
    })
})