import express, { Request, Response, NextFunction } from "express";
require("dotenv").config();

const router = express.Router();
const registered_user_controller = require("../controllers/RegisteredUserController");

/* GET users listing */
router.get(
  "/", registered_user_controller.index
);

/* create user */
router.post(
	"/create",  registered_user_controller.create
);



export default router;
