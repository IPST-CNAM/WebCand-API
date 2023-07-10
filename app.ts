/* These lines of code are importing various modules and libraries that are required for setting up and
running an Express server. */
import express from "express";
import { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";

/* These lines of code are importing the router modules from the specified paths. */
import testAPIRouter from "./routes/testAPI";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

/* These lines of code are creating an instance of the Express application and assigning it to the
variable `app`. The `express()` function returns an Express application object that can be used to
configure and run the server. */
const app: Application = express();
const port = process.env.PORT;

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
};

/* `app.use(cors({ origin: "*" }));` is enabling Cross-Origin Resource Sharing (CORS) for all routes in
the Express application. */
app.use(cors(corsOptions));

/* These lines of code are configuring the view engine and the views directory for the Express
application. */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

/* These lines of code are setting up middleware functions in the Express application. */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* The code `app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));` is setting up
middleware to parse JSON data in the request body. It uses the `body-parser` library to parse the
JSON data and make it available in `req.body` for further processing. */
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();

app.use("/testAPI", testAPIRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(express.json());

// start the server
app.listen(port, () => {
  console.log(`server running : http://localhost:${port}`);
});

export default app;
