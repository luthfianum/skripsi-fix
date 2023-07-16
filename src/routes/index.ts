import { Router } from "express";
import { notFoundErrorHandler } from "../middlewares/errorHandler";
import { isAuthenticated } from "../middlewares/authentication";
import mahasiswaRouter from "./mahasiswa.route";
import authRouter from "./auth.route";
import kuisionerRoute from "./kuisioner.route";
import baseRouter from "./base.route";

const router = Router();

router.use('/', baseRouter)
router.use('/auth', authRouter)
router.use('/mahasiswa', isAuthenticated, mahasiswaRouter)
router.use('/kuisioner', isAuthenticated, kuisionerRoute)

router.use(notFoundErrorHandler);

export { router, Router };