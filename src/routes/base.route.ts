import { Router } from "express";
import PingController from "../controllers/ping.controller";
const baseRouter = Router();

baseRouter.get("/ping", async (_req, _res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return _res.send(response);
});

export default baseRouter;