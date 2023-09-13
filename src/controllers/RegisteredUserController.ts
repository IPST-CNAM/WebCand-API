import express, { Request, Response, NextFunction } from "express";
import dbpool from "../utils/DbPool"

const pool = dbpool.getPool();

// get the list of ALL registered users
exports.index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conn = await pool.getConnection();
      try {
        const rows = await conn.query("SELECT * FROM RegisteredUser");
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



