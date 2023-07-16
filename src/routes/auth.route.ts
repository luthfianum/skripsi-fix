import { Router } from "./index";
import { authController } from "../controllers/auth.controller";
const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;
