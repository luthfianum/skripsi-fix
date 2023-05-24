import sequelize from "./config/sequelize";

import vars from "./config/vars";
import app from "./config/app";
import logger from "./config/logger";
import MailService from "./config/nodemailer";

const PORT = vars.port;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    const mailService = MailService.getInstance();
    await mailService.createConnection();
    await mailService.verifyConnection();
    logger.info("DB Connection: OK");
    logger.info('SMTP Server Connected');
    logger.info('SMTP Connection Verified');
  } catch (error) {
    logger.info("DB Connection: FAILED");
    logger.info('SMTP Server Not Connected');
    logger.info('SMTP Connection Not Verified');
    return 0
  }
  logger.info("Server is running on port: " + PORT);
});
