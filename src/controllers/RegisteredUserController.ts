import express, { Request, Response, NextFunction } from "express";
import dbpool from "../utils/DbPool"
import VerifyData from "../utils/VerifyData"

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

// create the user
exports.create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conn = await pool.getConnection();
      try {
        //check if every elements are here
        var elements = ["email", "first_name", "last_name", "birth_date", "password", "phone_number", "id_EnumAdministrativeLevel"]
        if (!VerifyData.checkIfQueryExist(req, elements)) {
            res.status(400); //400 is error
            res.send("error in the request");
            return;
        }
        
        //we don't care about security, so no hashing on the pw
        await conn.query("INSERT INTO RegisteredUser (email, first_name, last_name, birth_date, password, phone_number, id_EnumAdministrativeLevel) VALUES (?,?,?,?,?,?,?)",
        [req.query.email,
        req.query.first_name,
        req.query.last_name,
        req.query.birth_date,
        req.query.password,
        req.query.phone_number,
        req.query.id_EnumAdministrativeLevel]);
        res.status(200); //200 is success
        res.send()
      } catch (err) {
        console.log(err);
      } finally {
        conn.end();
      }
    } catch (err) {
      console.log(err);
    }
}


