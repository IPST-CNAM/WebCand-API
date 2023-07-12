/* Importing various modules and libraries that are required for setting up and
running an Express server. */
import express from "express";
import { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";

/* Importing the router modules from the specified paths. */
import indexRouter from "./src/routes/IndexRoute";
import candidateRouter from "./src/routes/CandidateRoute";
import registeredUserRouter from "./src/routes/RegisteredUserRoute";

/* Creating an instance of the Express application and assigning it to the
variable `app`. The `express()` function returns an Express application object that can be used to
configure and run the server. */
const app: Application = express();
const port = process.env.PORT;

app.use(cors());

/* Configuring the view engine and the views directory for the Express
application. */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

/* Setting up middleware functions in the Express application. */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* Setting up middleware to parse JSON data in the request body. 
It uses the `body-parser` library to parse the
JSON data and make it available in `req.body` for further processing. */
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();

/* Setting up a middleware functions, example for the root path ("/") of the
server. It means that whenever a request is made to the root path, the middleware function defined
in `indexRouter` will be executed. */
app.use("/", indexRouter);
app.use("/candidates", candidateRouter);
app.use("/registeredUsers", registeredUserRouter);

app.use(express.json());

// start the server
app.listen(port, () => {
  console.log(`server running : http://localhost:${port}`);
});

export default app;
