import express, { Application } from "express";
import morgan from "morgan";
import sequelize from "./config/sequelize";
import cors from "cors";
import router from "./routes";
import vars from "./config/vars";

const PORT = vars.port;

const app: Application = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors());

app.use("/api", router);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connection:", "OK");
  } catch (error) {
    console.log("DB Connection:", "FAILED");
  }
  console.log("Server is running on port:", PORT);
});
