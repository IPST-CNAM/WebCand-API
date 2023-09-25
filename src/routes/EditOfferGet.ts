import express, { Request, Response, NextFunction } from "express";
import mariadb from "mariadb";
require("dotenv").config();

const EditOfferGetRouter = express.Router();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5, // Adjust as per your requirements
});

/* GET users listing using mariadb */
EditOfferGetRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conn = await pool.getConnection();
      try {
        const id = req.params.id;
        console.log("req.params:", req.params);
        console.log(req.params.id);
        const rows = await conn.query("SELECT * from CompanyOffer WHERE id_company_offer = ?", [id]);
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

export default EditOfferGetRouter;
