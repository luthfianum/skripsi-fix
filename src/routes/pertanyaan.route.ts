import { Router } from "./index";
import { pertanyaanController } from "../controllers/pertanyaan.controller";

const pertanyaanRoute = Router();

pertanyaanRoute.get('/', pertanyaanController.getListByKuisionerId);
pertanyaanRoute.get('/:id', pertanyaanController.getById);
pertanyaanRoute.post('/', pertanyaanController.create);
pertanyaanRoute.patch('/:id', pertanyaanController.update);
pertanyaanRoute.delete('/:id', pertanyaanController.delete);

export default pertanyaanRoute;