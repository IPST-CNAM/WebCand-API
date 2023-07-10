import express, { Request, Response, NextFunction } from 'express';
import mariadb from 'mariadb';
require('dotenv').config();

const testAPIRouter = express.Router();


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5, // Adjust as per your requirements
});

/* Return "API is working properly" if connection
to mariadb is successful */
testAPIRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const conn = await pool.getConnection();
        try {
            await conn.query("SELECT * FROM Candidate");
            res.send("API is working properly !");
        } catch (err) {
            console.log(err);
        } finally {
            conn.end();
        }
    } catch (err) {
        console.log(err);
    }
});

export default testAPIRouter;