import express from 'express';
import { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

//routes imports
import testAPIRouter from './routes/testAPI';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app: Application = express();
const port = 9000;

// body-parser
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
dotenv.config();

// routes
app.use('/testAPI', testAPIRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// start the server
app.listen(port, () => {
  console.log(
    `server running : http://localhost:${port}`
  );
});