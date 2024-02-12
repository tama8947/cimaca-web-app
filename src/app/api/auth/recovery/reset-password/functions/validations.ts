import jwt from 'jsonwebtoken';
import { prismaInstance } from '@/app/api/services/db/prisma';

type ErrorResponsesRequest = {
  message: string
}

type StatusValidationResponse = {
  message: string
  status: number
  data?: { email: string }
}

const prisma = prismaInstance;

const tokenValuesAndTimeValidation = (authorization: string) => {
  const token = authorization.split(' ')[1];
  return jwt.verify(
    token,
    process.env.SECRET_JWT!
  ) as jwt.JwtPayload & { email: string };
};

const tokenStructureValidation = (authorization: string | null) => {
  const [bearer, token] = (authorization as unknown as string).split(' ');

  if (bearer !== 'Bearer' || token === undefined || token === null) {
    return { message: 'Formato de token no válido', status: 401 };
  }

  return { message: 'Estructura correcta', status: 200 };
};

const otherTokenErrors = (error: ErrorResponsesRequest) => {
  if (error.message.includes('expired')) {
    return { message: 'Token expirado.', status: 401 };
  }
  if (error.message.includes('malformed')) {
    return { message: 'Error token mal formado.', status: 401 };
  }
  return {
    message : `Error de validación de token. ${error.message}`,
    status  : 401
  };
};

export const validateToken = async (
  authorization: string | null
): Promise<StatusValidationResponse> => {
  if (authorization === null) { return { message: 'Se requiere un token de autorización', status: 401 }; }

  const structureValidation = tokenStructureValidation(authorization);

  if (structureValidation.status === 401) return structureValidation;

  try {
    const { email } = tokenValuesAndTimeValidation(authorization);

    const userData = await prisma.users.findUnique({
      where: { email }
    });

    if (userData?.verification_token !== authorization.split(' ')[1]) { return { message: 'El token no es el último generado.', status: 401 }; }

    return { message: 'Token válido', status: 200, data: { email } };
  } catch (err) {
    const error = err as ErrorResponsesRequest;
    return otherTokenErrors(error);
  }
};
