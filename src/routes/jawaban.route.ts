import { Router } from "./index";
import jawabanController from "../controllers/jawaban.controller";
const jawabanRouter = Router();

jawabanRouter.get("/:kuisionerId/jawaban", jawabanController.getByKuisionerId);

export default jawabanRouter;
