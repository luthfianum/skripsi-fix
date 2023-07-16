import { Router } from "./index";
import { mahasiswaController } from "../controllers/mahasiswa.controller";
const mahasiswaRouter = Router();

mahasiswaRouter.get("/", mahasiswaController.getList);
mahasiswaRouter.get("/:id", mahasiswaController.getById);
mahasiswaRouter.post("/", mahasiswaController.create);
mahasiswaRouter.patch("/:id", mahasiswaController.update);

export default mahasiswaRouter;
