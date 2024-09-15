import nodemailer from 'nodemailer';
import { envs } from '../../config/env.connetion';

interface MailOptions {
    to: string
    subject: string
    htmlBody: string
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAIL_SERVICE,
        auth: {
            user: envs.MAIL_USER,
            pass: envs.MAIL_SECRET_KEY
        }
    });

    async sendEmail(options: MailOptions) {
        try {
            const sendInformation = await this.transporter.sendMail({
                to: options.to,
                subject: options.subject,
                html: options.htmlBody
            });
            console.log(sendInformation);
        } catch (error) {
            console.error(error);
        }
    }
}