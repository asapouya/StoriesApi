const express = require("express");
const app = express();
const helmet = require("helmet");

const users_router = require("./routes/users.routes");
const books_router = require("./routes/books.routes");
const auth_router = require("./routes/auth.routes");
const error_middleware = require("./middlewares/catch_error");

const express_file_upload = require("express-fileupload");

const databaseConnect = require("./models/database.connection");

const config = require("config");

if(!config.get("JWT_PRIVATE_KEY")){
    console.error("FATAL ERROR: JWT_PRIVATE_KEY not found!");
    process.exit(1);
}

databaseConnect();

app.use(helmet());
app.use(express.json());
app.use(express_file_upload());

app.use("/v1/users", users_router);
app.use("/v1/auth", auth_router);
app.use("/v1/books", books_router);
app.use(error_middleware);

const port = process.env.PORT || 8888;
const server = app.listen(port, () => console.info(`listening on port ${port}`));

module.exports = server;