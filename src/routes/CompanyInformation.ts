import express, { Request, Response, NextFunction } from "express";
import mariadb from "mariadb";
require("dotenv").config();

const CompanyInfoRouter = express.Router();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5, // Adjust as per your requirements
});

/* GET users listing using mariadb */
CompanyInfoRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conn = await pool.getConnection();
      try {
        const rows = await conn.query("select * FROM Company WHERE id_company = 1");
        res.send(rows);
      } catch (err) {
        console.log(err);
      } finally {
        conn.end();
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export default CompanyInfoRouter;
