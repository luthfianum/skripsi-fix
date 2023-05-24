import { Router } from "express";
import { kuisionerController } from "../controllers/kuisioner.controller";
import pertanyaanRoute from "./pertanyaan.route";
const kuisionerRoute = Router();

kuisionerRoute.get('/', kuisionerController.getList);
kuisionerRoute.get('/:id', kuisionerController.getById);
kuisionerRoute.post('/', kuisionerController.create);
kuisionerRoute.patch('/:id', kuisionerController.update);
kuisionerRoute.use('/:kuisionerId/pertanyaan', pertanyaanRoute)

export default kuisionerRoute;