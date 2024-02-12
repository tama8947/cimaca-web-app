import jwt from 'jsonwebtoken';
import { createEmailService } from '../../../services/email/email-service';
import recoveryMail from './template-email/recovery-mail.html';
import { prismaInstance } from '@/app/api/services/db/prisma';

const prisma = prismaInstance;

const getUser = async (email: string) => {
  return await prisma.users.findFirst({
    where: {
      email
    }
  });
};

const getTemplateEmail = (userName: string, urlRecovery: string) => {
  return recoveryMail
    .replace('$[name]', userName)
    .replaceAll('$[urlPasswordReset]', urlRecovery);
};

const generateJWTString = (payload: object) => {
  try {
    return jwt.sign(
      {
        ...payload
      },
      process.env.SECRET_JWT!,
      { expiresIn: '2m' }
    );
  } catch (err) {
    const error = (err as { message: string }).message;
    return `Error: ${error}`;
  }
};

type RequestData = {
  email: string
}

export async function POST (request: Request) {
  const { email }: RequestData = await request.json();

  const payload = { email };

  const verificationToken = generateJWTString(payload);

  if (verificationToken.includes('Error:')) {
    return new Response(
      `Ha ocurrido un error al enviar el correo. ${verificationToken}`,
      { status: 500 }
    );
  }

  const recoverUrl = `${request.headers.get(
    'origin'
  )}/auth/reset-password?token=${verificationToken}`;

  const userData = await getUser(email);

  if (userData !== null && userData !== undefined) {
    const emailService = createEmailService({ awsCredentials: true });
    const templateEmail = getTemplateEmail(
      `${userData.name} ${userData.last_name}`,
      recoverUrl
    );

    try {
      await emailService.sendEmail({
        subject : "Recuperación de contraseña D' La Maccarena",
        to      : email,
        html    : templateEmail
      });

      await prisma.users.update({
        where : { email },
        data  : { verification_token: verificationToken }
      });

      return new Response(
        'Se ha enviado un enlace a su correo para realizar el cambio de contraseña.'
      );
    } catch (err) {
      const error: ErrorNodemailerRequest = err as ErrorNodemailerRequest;

      const errorMsg = error?.Error?.Message ?? error.response ?? error.message;

      return new Response(
        `Ha ocurrido un error al enviar el correo. ${errorMsg}`,
        { status: 500 }
      );
    }
  } else {
    return new Response('El correo electrónico no existe.', { status: 404 });
  }
}
