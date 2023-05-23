import dotenv from 'dotenv'
dotenv.config();

const vars = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    service: process.env.DB_SERVICE || 'postgres',
    username: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'surveyup',
    logging: Boolean(process.env.DB_LOGGING) || false,
    schema: process.env.DB_SCHEMA || 'public',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp-relay.sendinblue.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Boolean(process.env.SMTP_SECURE) || false,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
    sender: process.env.SMTP_SENDER || 'SurveyUp Admin <admin@surveyup.com>',
  }
};

export default vars;