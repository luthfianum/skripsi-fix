import { Router } from "./index";
import kuisionerController from "../controllers/kuisioner.controller";
import pertanyaanRoute from "./pertanyaan.route";
import sectionRoute from "./section.route";
import jawabanRouter from "./jawaban.route";
const kuisionerRoute = Router();

kuisionerRoute.get('/', kuisionerController.getList);
kuisionerRoute.get('/:id', kuisionerController.getById);
kuisionerRoute.post('/', kuisionerController.create);
kuisionerRoute.patch('/:id', kuisionerController.update);
kuisionerRoute.delete('/:id', kuisionerController.delete);
kuisionerRoute.use('/', pertanyaanRoute)
kuisionerRoute.use('/', sectionRoute)
kuisionerRoute.use('/', jawabanRouter)

export default kuisionerRoute;