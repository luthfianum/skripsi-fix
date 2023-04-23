

const vars = {
  port: process.env.PORT || 3000,
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
};

export default vars;