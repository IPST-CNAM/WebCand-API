import express, { Request, Response, NextFunction } from "express";
import mariadb from "mariadb";
require("dotenv").config();

const DescriptionCompanyRouter = express.Router();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5, // Adjust as per your requirements
});

/* GET users listing using mariadb */
DescriptionCompanyRouter.put(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        description,
        name
      } = req.body;

      const conn = await pool.getConnection();
      try {

        const insertQuery = `
      UPDATE Company
      SET description = ?
      WHERE name = ?;      
      `;
      
        await conn.query(insertQuery, [description, name]);
        res.status(201).send("description update sucessfully");
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

export default DescriptionCompanyRouter;
