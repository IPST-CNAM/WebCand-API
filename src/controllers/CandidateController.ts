import express, { Request, Response, NextFunction } from "express";
import dbpool from "../utils/DbPool"

const pool = dbpool.getPool();

//get all candidates
exports.index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conn = await pool.getConnection();
      try {
        console.log("selecting");
        const rows = await conn.query("SELECT * FROM Candidate");
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
