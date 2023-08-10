import { Router } from "./index";
import pertanyaanController from "../controllers/pertanyaan.controller";

const pertanyaanRoute = Router();

pertanyaanRoute.get('/:kuisionerId/pertanyaan/', pertanyaanController.getListByKuisionerId);
pertanyaanRoute.get('/:kuisionerId/pertanyaan/:id', pertanyaanController.getById);
pertanyaanRoute.post('/:kuisionerId/pertanyaan/', pertanyaanController.create);
pertanyaanRoute.post('/:kuisionerId/pertanyaan/:id/option', pertanyaanController.createOption);
pertanyaanRoute.delete('/:kuisionerId/pertanyaan/:pertanyaanId/option/:id', pertanyaanController.deleteOption);
pertanyaanRoute.patch('/:kuisionerId/pertanyaan/:id', pertanyaanController.update);
pertanyaanRoute.delete('/:kuisionerId/pertanyaan/:id', pertanyaanController.delete);

export default pertanyaanRoute;