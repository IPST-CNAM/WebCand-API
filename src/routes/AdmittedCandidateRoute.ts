import express, { Request, Response, NextFunction } from "express";
import mariadb from "mariadb";
require("dotenv").config();

const admittedCandidateRouter = express.Router();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5, // Adjust as per your requirements
});

/* GET users listing using mariadb */
admittedCandidateRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conn = await pool.getConnection();
      try {
        const rows = await conn.query("SELECT A.id_registered_user AS admitted_id, A.internal_email,R.first_name,R.last_name,R.birth_date, C.id_registered_user AS candidate_id, C.ine_number, C.last_degree, C.work_experiences, C.gender, C.skills FROM AdmittedCandidate A INNER JOIN Candidate C ON A.id_registered_user = C.id_registered_user INNER JOIN RegisteredUser R ON A.id_registered_user = R.id_registered_user");
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

export default admittedCandidateRouter;
