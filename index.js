const express = require("express");
const users_router = require("./routes/users.routes");
const error_middleware = require("./middleware/catch_error");
const databaseConnect = require("./models/database.connection");

const app = express();
databaseConnect();


app.use(express.json());
app.use("/v1/users", users_router);
app.use(error_middleware);


const port = process.env.PORT || 8888;
app.listen(port, () => console.info(`listening on port ${port}`));