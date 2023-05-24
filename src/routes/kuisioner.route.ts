import { Router } from "express";
import { kuisionerController } from "../controllers/kuisioner.controller";
const kuisionerRoute = Router();

kuisionerRoute.get('/', kuisionerController.getList);
kuisionerRoute.get('/:id', kuisionerController.getById);
kuisionerRoute.post('/', kuisionerController.create);
kuisionerRoute.patch('/:id', kuisionerController.update);

export default kuisionerRoute;