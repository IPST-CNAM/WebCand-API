// Importez les modules nécessaires
import express, { Request, Response, NextFunction } from "express";
import mariadb from "mariadb";
require("dotenv").config();

const submitOffersRouter = express.Router();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5, // Adjust as per your requirements
});

// Route pour insérer une nouvelle offre
submitOffersRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      duration,
      start_date,
      required_degree_level,
      title,
      description,
      id_registered_user
    } = req.body;

    const conn = await pool.getConnection();
    try {
      const insertQuery = `
        INSERT INTO CompanyOffer (duration, start_date, required_degree_level, title, description, id_registered_user)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      await conn.query(insertQuery, [duration, start_date, required_degree_level, title, description, id_registered_user]);
      res.status(201).send("Offer created successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    } finally {
      conn.end();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Bad request");
  }
});

export default submitOffersRouter;
