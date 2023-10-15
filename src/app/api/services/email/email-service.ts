import * as aws from '@aws-sdk/client-ses';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import nodemailer, { type Transporter } from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

type SendEmailOptions = Mail.Options;

interface ParametersEmailService { awsCredentials?: boolean }

export default class EmailService {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly awsCredentials: boolean;
  constructor (params?: ParametersEmailService) {
    this.awsCredentials = params?.awsCredentials ?? true;

    if (this.awsCredentials) {
      const ses = new aws.SES({
        credentialDefaultProvider: defaultProvider, region: process.env.AWS_REGION
      });

      this.transporter = nodemailer.createTransport({
        SES: { ses, aws }
      });
    } else {
      this.transporter = nodemailer.createTransport({
        host   : process.env.HOST_EMAIL,
        port   : parseInt(process.env.PORT_EMAIL as string),
        secure : process.env.SECURE_EMAIL === 'true',
        auth   : {
          user : process.env.USER_EMAIL,
          pass : process.env.PASSWORD_EMAIL
        }
      });
    }
  }

  async sendEmail (options: SendEmailOptions) {
    return await this.transporter.sendMail({
      ...options,
      from: process.env.USER_EMAIL_FROM
    });
  }
}
