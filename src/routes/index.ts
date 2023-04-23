import {Router} from "express";
import PingController from "../controllers/ping.controller";
import mahasiswaRouter from "./mahasiswa.route";

const router = Router();

router.get("/ping", async (_req, _res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return _res.send(response);
});

router.use('/mahasiswa', mahasiswaRouter)

export default router;