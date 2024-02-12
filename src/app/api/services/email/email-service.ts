import * as aws from '@aws-sdk/client-ses';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import nodemailer, { type Transporter } from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

type SendEmailOptions = Mail.Options;

type ParametersEmailService = { awsCredentials?: boolean }

const createTransporter = (params: ParametersEmailService, awsCredentials: boolean): Transporter<SMTPTransport.SentMessageInfo> => {
  if (awsCredentials) {
    const ses = new aws.SES({
      credentialDefaultProvider: defaultProvider, region: process.env.AWS_REGION
    });

    return nodemailer.createTransport({
      SES: { ses, aws }
    });
  } else {
    return nodemailer.createTransport({
      host   : process.env.HOST_EMAIL,
      port   : parseInt(process.env.PORT_EMAIL!),
      secure : process.env.SECURE_EMAIL === 'true',
      auth   : {
        user : process.env.USER_EMAIL,
        pass : process.env.PASSWORD_EMAIL
      }
    });
  }
};

const sendEmail = async (transporter: Transporter<SMTPTransport.SentMessageInfo>, options: SendEmailOptions) => {
  return await transporter.sendMail({
    ...options,
    from: process.env.USER_EMAIL_FROM
  });
};

export const createEmailService = (params?: ParametersEmailService) => {
  const awsCredentials = params?.awsCredentials ?? true;
  const transporter = createTransporter(params ?? {}, awsCredentials);

  return {
    sendEmail: async (options: SendEmailOptions) => await sendEmail(transporter, options)
  };
};
