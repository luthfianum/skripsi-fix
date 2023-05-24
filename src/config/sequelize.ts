import { Sequelize } from "sequelize-typescript";
import vars from "./vars";
import { Mahasiswa, Kuisioner, Pertanyaan } from "../models/index.model";
// import { Pertanyaan } from "../models/pertanyaan.model";

const sequelize = new Sequelize({
  host: vars.db.host,
  port: vars.db.port,
  username: vars.db.username,
  password: vars.db.password,
  database: vars.db.database,
  dialect: 'postgres',
  logging: vars.db.logging,
  repositoryMode: true,
  define: {
    schema: vars.db.schema,
  },
  models: [Mahasiswa, Kuisioner, Pertanyaan],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

export default sequelize;