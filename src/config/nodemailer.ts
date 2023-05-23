
import nodemailer from 'nodemailer';
import { MailInterface } from '../types/mail.type';
import logger from './logger';
import vars from './vars';

export default class MailService {
    private static instance: MailService;
    private transporter!: nodemailer.Transporter;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
    //INSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    //CREATE CONNECTION FOR LOCAL
    async createLocalConnection() {
        const account = await nodemailer.createTestAccount();
        this.transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
    }
    //CREATE A CONNECTION FOR LIVE
    async createConnection() {
        this.transporter = nodemailer.createTransport({
            host: vars.smtp.host,
            port: vars.smtp.port,
            secure: vars.smtp.secure,
            auth: {
                user: vars.smtp.username,
                pass: vars.smtp.password,
            },
        });
    }

    //SEND MAIL
    async sendMail(
        requestId: string | number | string[],
        options: MailInterface
    ) {
        return await this.transporter
            .sendMail({ 
                from: `${process.env.SMTP_SENDER || options.from}`,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
            })
            .then((info) => {
                logger.info(`${requestId} - Mail sent successfully!!`);
                logger.info(`${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`);
                if (process.env.NODE_ENV === 'local') {
                    logger.info(`${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(
                        info
                    )}`);
                }
                return info;
            }).catch((err) => {
                logger.error(`${requestId} - Mail failed to send!!`);
                logger.error(`${requestId} - [Error]=${err}`);
                throw err;
            });
    }

    // SEND WELCOME EMAIL TO USER
    async sendWelcomeEmail(
        userEmail : string,
    ) {
        return await this.sendMail(
            'sendWelcomeEmail',
            {
                from: 'SurveyUp Admin <admin@surveyup.com>',
                to: userEmail,
                subject: 'Welcome to SurveyUp',
                text: 'Welcome to SurveyUp',
                html: '<b>Welcome to SurveyUp</b>',
            }
        )
    }

    //VERIFY CONNECTION
    async verifyConnection() {
        return this.transporter.verify();
    }
    //CREATE TRANSPORTER
    getTransporter() {
        return this.transporter;
    }
}