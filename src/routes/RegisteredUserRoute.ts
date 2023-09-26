import express, { Request, Response, NextFunction } from "express";
import mariadb from "mariadb";
require("dotenv").config();

const userRouter = express.Router();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5, // Adjust as per your requirements
});

/* GET users listing using mariadb */
userRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conn = await pool.getConnection();
      try {
        const rows = await conn.query("SELECT id_registered_user , email , first_name,  last_name , birth_date, phone_number FROM RegisteredUser");
        res.send(rows);
      } catch (err) {
        console.log(err);
        res.status(500).send("Erreur serveur");
      } finally {
        conn.end();
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur serveur");
    }
  }
);

export default userRouter;
