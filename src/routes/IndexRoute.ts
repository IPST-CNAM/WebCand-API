import express, { Request, Response, NextFunction } from "express";

const indexRouter = express.Router();

indexRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("Express Server Hello World ");
    } catch (error) {
      console.log(error);
    }
  }
);

export default indexRouter;
