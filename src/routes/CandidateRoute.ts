import express, { Request, Response, NextFunction } from "express";
import mariadb from "mariadb";
require("dotenv").config();

const router = express.Router();
const candidate_controller = require("../controllers/CandidateController");

/* GET users listing using mariadb */
router.get("/", candidate_controller.index);

export default router;
