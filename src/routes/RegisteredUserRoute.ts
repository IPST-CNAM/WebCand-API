
import express, { Request, Response, NextFunction } from "express";
import { pool } from "../utils/db"; 

const registeredUserRouter = express.Router();

registeredUserRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM RegisteredUser");
    res.send(rows);
  } catch (err) {
    console.log(err);
    next(err); 
  } finally {
    if (conn) conn.end();
  }
});

export default registeredUserRouter;
