import express, { Request, Response, NextFunction } from "express";
import mariadb from "mariadb";
require("dotenv").config();

const deleteOfferRouter = express.Router();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5, // Adjust as per your requirements
});

/* DELETE an offer by its ID */
deleteOfferRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conn = await pool.getConnection();
      try {
        const id = req.params.id;
        console.log("req.params:", req.params);
        console.log(req.params.id);
        const result = await conn.query("DELETE FROM CompanyOffer WHERE id_company_offer = ?", [id]);
        console.log("Deleted rows:", result.affectedRows); // Log the number of affected rows
        res.send(`Offer with ID ${id} has been successfully deleted.`);
      } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while deleting the offer.");
      } finally {
        conn.end();
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred while connecting to the database.");
    }
  }
);

export default deleteOfferRouter;

