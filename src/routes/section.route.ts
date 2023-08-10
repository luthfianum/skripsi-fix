import { Router } from "./index";
import sectionController from "../controllers/section.controller";
const sectionRouter = Router();

sectionRouter.get("/section", sectionController.getList);
sectionRouter.get("/section/:id", sectionController.getById);
sectionRouter.post("/section", sectionController.create);
sectionRouter.patch("/section/:id", sectionController.update);

export default sectionRouter;
