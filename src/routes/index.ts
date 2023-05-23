import { Router } from "express";
import PingController from "../controllers/ping.controller";
import mahasiswaRouter from "./mahasiswa.route";
import { notFoundErrorHandler } from "../middlewares/errorHandler";
import authRouter from "./auth.route";
import { isAuthenticated } from "../middlewares/authentication";
import kuisionerRoute from "./kuisioner.route";

const router = Router();

router.get("/ping", async (_req, _res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return _res.send(response);
});

router.use('/auth', authRouter)
router.use('/mahasiswa', isAuthenticated, mahasiswaRouter)
router.use('/kuisioner', isAuthenticated, kuisionerRoute)

router.use(notFoundErrorHandler);

export default router;