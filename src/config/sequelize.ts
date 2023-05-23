import { Sequelize } from "sequelize-typescript";
import vars from "./vars";
import { Mahasiswa, Kuisioner } from "../models/index.model";

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
  models: [Mahasiswa, Kuisioner],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

export default sequelize;