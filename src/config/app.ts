import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import {errorHandler} from "../middlewares/errorHandler";
import router from "../routes";
import formData from "express-form-data";

const app: Application = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors());
app.use(formData.parse());

app.use("/api", router);
app.use(errorHandler);

export default app;